import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';

@Module({
  controllers: [DomainsController],
  providers: [DomainsService],
})
export class DomainsModule {}
