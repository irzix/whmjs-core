import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentGatewaysService } from "./payment-gateways.service";
import { PaymentFactory } from "./payment-gateways.factory";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentGatewaysHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentGatewaysService: PaymentGatewaysService,
    private readonly paymentFactory: PaymentFactory
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {

    const paymentGateway = await this.paymentGatewaysService.findOne(createPaymentDto.gatewayId);
    if (!paymentGateway.isActive) {
      throw new BadRequestException('Payment gateway is not active');
    }

    const currency = await this.prisma.currency.findUnique({
      where: {
        id: createPaymentDto.currencyId,
      },
    });
    if (!currency) {
      throw new Error('Currency not found');
    }

    const provider = this.paymentFactory.get(paymentGateway.name);

    return await provider.initiate({
      gateway: paymentGateway,
      amount: createPaymentDto.amount,
      currency: currency.code,
      transactionId: createPaymentDto.transactionId
    });
  }

  async verify(transactionId: number, data) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction || !transaction.gatewayId) {
      throw new Error('Transaction not found');
    }

    const gateway = await this.prisma.paymentGateway.findUnique({
      where: {
        id: transaction.gatewayId,
      },
    });
    if (!gateway) {
      throw new Error('Payment gateway not found');
    }

    const provider = this.paymentFactory.get(gateway.name);
    const verificationResult = await provider.verify(transaction, data);

    const isSuccess = verificationResult?.status === 'success';

    return this.prisma.$transaction(async (tx) => {
      const updatedTransaction = await tx.transaction.update({
        where: { id: transactionId },
        data: {
          status: isSuccess ? 'COMPLETED' : 'FAILED',
        },
      });

      if (isSuccess && updatedTransaction.invoiceId) {
        await tx.invoice.update({
          where: { id: updatedTransaction.invoiceId },
          data: { status: 'PAID', paidAt: new Date() },
        });
      }

      return updatedTransaction;
    });
  }


  async webhook(gatewayName: string, headers, rawBody) {
    const provider = this.paymentFactory.get(gatewayName);

    const gateway = await this.prisma.paymentGateway.findUnique({
      where: {
        name: gatewayName,
      },
    });
    if (!gateway) {
      throw new Error('Payment gateway not found');
    }

    const verify = await provider.webhook(gateway, headers, rawBody);
    const isSuccess = verify.transactionId && (verify.status === 'success');
    if (!isSuccess) {
      return { status: 'failed', message: 'Event ignored (no transaction ID attached)' };
    }

    const updatedTransaction = await this.prisma.$transaction(async (tx) => {
      const updatedTransaction = await tx.transaction.update({
        where: { id: verify.transactionId },
        data: {
          status: isSuccess ? 'COMPLETED' : 'FAILED',
        },
      });

      if (isSuccess && updatedTransaction.invoiceId) {
        await tx.invoice.update({
          where: { id: updatedTransaction.invoiceId },
          data: { status: 'PAID', paidAt: new Date() },
        });
      }

      return updatedTransaction;
    });

    return verify;
  }

}