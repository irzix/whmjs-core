import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { NotificationProvidersService } from './notification-providers.service';
import { UpdateNotificationProviderDto } from './dto/update-notification-provider.dto';
import { FindNotificationLogsDto } from './dto/find-notification-logs.dto';
import { NotificationProviderEntity } from './entities/notification-provider.entity';
import { NotificationLogEntity } from './entities/notification-log.entity';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationProvidersController {
  constructor(
    private readonly notificationProvidersService: NotificationProvidersService,
  ) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'read', 'all')
  @Get('providers')
  @ApiOperation({ summary: 'Get all notification providers including configs' })
  @ApiResponse({ status: 200, type: [NotificationProviderEntity] })
  async findAll() {
    return this.notificationProvidersService.findAll({});
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'read', 'all')
  @Get('providers/:id')
  @ApiOperation({ summary: 'Get a specific notification provider' })
  @ApiResponse({ status: 200, type: NotificationProviderEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notificationProvidersService.findOne(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'update', 'all')
  @Patch('providers/:id/activate')
  @ApiOperation({ summary: 'Activate a notification provider' })
  @ApiResponse({ status: 200, type: NotificationProviderEntity })
  async activate(@Param('id', ParseIntPipe) id: number) {
    return this.notificationProvidersService.activate(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'update', 'all')
  @Patch('providers/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate a notification provider' })
  @ApiResponse({ status: 200, type: NotificationProviderEntity })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.notificationProvidersService.deactivate(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'update', 'all')
  @Patch('providers/:id/config')
  @ApiOperation({
    summary: 'Update notification provider config (e.g., SMTP credentials)',
  })
  @ApiResponse({ status: 200, type: NotificationProviderEntity })
  async setConfig(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificationProviderDto,
  ) {
    return this.notificationProvidersService.setConfig(id, dto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @RequirePermission('notifications', 'read', 'all')
  @Get('logs')
  @ApiOperation({ summary: 'List sent notifications with pagination' })
  @ApiResponse({ status: 200, type: [NotificationLogEntity] })
  async findAllLogs(@Query() query: FindNotificationLogsDto) {
    return this.notificationProvidersService.findAllLogs(query);
  }
}
