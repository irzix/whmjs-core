import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';

@Injectable()
export class PaymentGatewaysService implements OnModuleInit {


  constructor(private readonly prisma: PrismaService) { }

  private readonly providers = ['stripe', 'paypal', 'crypto'];

  async onModuleInit() {
    await Promise.all(
      this.providers.map((name) =>
        this.prisma.paymentGateway.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );
  }

  findAll({ pub }: { pub?: boolean }) {
    return this.prisma.paymentGateway.findMany({
      where: pub ? { isActive: true } : {},
      select: {
        id: true,
        name: true,
        isActive: true,
        config: pub ? false : true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const gateway = await this.prisma.paymentGateway.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        isActive: true,
        config: true,
        updatedAt: true,
      },
    });
    if (!gateway) {
      throw new NotFoundException(`Payment gateway with ID ${id} not found`);
    }
    return gateway;
  }

  async activate(id: number) {
    await this.findOne(id);
    return this.prisma.paymentGateway.update({
      where: { id },
      data: { isActive: true },
      select: {
        id: true,
        name: true,
        isActive: true,
        config: true,
        updatedAt: true,
      },
    });
  }

  async deactivate(id: number) {
    await this.findOne(id);
    return this.prisma.paymentGateway.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        isActive: true,
        config: true,
        updatedAt: true,
      },
    });
  }

  async setConfig(
    id: number,
    updatePaymentGatewayDto: UpdatePaymentGatewayDto,
  ) {
    await this.findOne(id);
    return this.prisma.paymentGateway.update({
      where: { id },
      data: {
        config: (updatePaymentGatewayDto.config ??
          undefined) as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        config: true,
        updatedAt: true,
      },
    });
  }
}
