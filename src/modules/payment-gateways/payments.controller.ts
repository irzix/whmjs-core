import {
    Controller,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Headers,
    Req,
    RawBodyRequest,
    Body,
    Query,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentGatewaysHandler } from './payment-gateways.handler';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentGatewaysHandler: PaymentGatewaysHandler,
    ) { }

    @Get(':id/verify')
    getVerify(@Param('id', ParseIntPipe) id: number, @Query() query: any) {
        return this.paymentGatewaysHandler.verify(id, query);
    }

    @Post(':id/verify')
    postVerify(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.paymentGatewaysHandler.verify(id, body);
    }

    @Post(':gateway/webhook')
    async webhook(
        @Param('gateway') gateway: string,
        @Headers() headers: any,
        @Req() req: RawBodyRequest<Request>,
    ) {
        return this.paymentGatewaysHandler.webhook(gateway, headers, req.rawBody);
    }
}
