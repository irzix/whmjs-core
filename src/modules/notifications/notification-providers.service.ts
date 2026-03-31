import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNotificationProviderDto } from './dto/update-notification-provider.dto';
import { FindNotificationLogsDto } from './dto/find-notification-logs.dto';

const providerSelect = {
  id: true,
  name: true,
  isActive: true,
  config: true,
  updatedAt: true,
};

@Injectable()
export class NotificationProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll({ pub }: { pub?: boolean }) {
    return this.prisma.notificationProvider.findMany({
      where: pub ? { isActive: true } : {},
      select: {
        ...providerSelect,
        config: pub ? false : true,
      },
    });
  }

  async findOne(id: number) {
    const provider = await this.prisma.notificationProvider.findUnique({
      where: { id },
      select: providerSelect,
    });
    if (!provider) {
      throw new NotFoundException(
        `Notification provider with ID ${id} not found`,
      );
    }
    return provider;
  }

  async activate(id: number) {
    await this.findOne(id);
    return this.prisma.notificationProvider.update({
      where: { id },
      data: { isActive: true },
      select: providerSelect,
    });
  }

  async deactivate(id: number) {
    await this.findOne(id);
    return this.prisma.notificationProvider.update({
      where: { id },
      data: { isActive: false },
      select: providerSelect,
    });
  }

  async setConfig(id: number, dto: UpdateNotificationProviderDto) {
    await this.findOne(id);
    return this.prisma.notificationProvider.update({
      where: { id },
      data: {
        config: (dto.config ?? undefined) as Prisma.InputJsonValue,
      },
      select: providerSelect,
    });
  }

  async findAllLogs(query: FindNotificationLogsDto) {
    const { page = 1, limit = 10, type, status, providerId } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(type && { type }),
      ...(status && { status }),
      ...(providerId && { providerId }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.notificationLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          provider: { select: { id: true, name: true } },
        },
      }),
      this.prisma.notificationLog.count({ where }),
    ]);

    return { data, total, page, limit };
  }
}
