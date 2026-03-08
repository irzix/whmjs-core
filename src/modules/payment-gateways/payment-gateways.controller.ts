import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaymentGatewaysService } from './payment-gateways.service';
import { UpdatePaymentGatewayDto } from './dto/update-payment-gateway.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';

@Controller('payment-gateways')
export class PaymentGatewaysController {
  constructor(
    private readonly paymentGatewaysService: PaymentGatewaysService,
  ) { }

  @Get('public')
  findAllPublic() {
    return this.paymentGatewaysService.findAll({ pub: true });
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('paymentGateways', 'read', 'all')
  @Get()
  findAll() {
    return this.paymentGatewaysService.findAll({});
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('paymentGateways', 'read', 'all')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewaysService.findOne(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('paymentGateways', 'update', 'all')
  @Patch(':id/activate')
  activate(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewaysService.activate(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('paymentGateways', 'update', 'all')
  @Patch(':id/deactivate')
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGatewaysService.deactivate(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('paymentGateways', 'update', 'all')
  @Patch(':id/config')
  setConfig(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentGatewayDto: UpdatePaymentGatewayDto,
  ) {
    return this.paymentGatewaysService.setConfig(id, updatePaymentGatewayDto);
  }
}
