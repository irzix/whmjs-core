import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsHandler } from './notifications.handler';
import { NotificationFactory } from './notifications.factory';
import { SmtpProvider } from './providers/smtp/smtp.provider';
import { NotificationsWorker } from './notifications.worker';
import { NotificationProvidersController } from './notification-providers.controller';
import { NotificationProvidersService } from './notification-providers.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [NotificationProvidersController],
  providers: [
    NotificationFactory,
    SmtpProvider,
    NotificationsHandler,
    NotificationsWorker,
    NotificationProvidersService,
  ],
  exports: [NotificationsHandler],
})
export class NotificationsModule {}
