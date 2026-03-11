import { Module } from '@nestjs/common';
import { ProvisionersService } from './provisioners.service';
import { ProvisionersController } from './provisioners.controller';

@Module({
  controllers: [ProvisionersController],
  providers: [ProvisionersService],
})
export class ProvisionersModule {}
