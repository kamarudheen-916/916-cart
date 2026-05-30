import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prisma.analyticsEvent.create({
        data: {
          sessionId: createEventDto.sessionId,
          eventType: createEventDto.eventType,
          page: createEventDto.page,
          source: createEventDto.source || null,
          campaign: createEventDto.campaign || null,
          medium: createEventDto.medium || null,
        },
      });
    } catch (error) {
      console.error('Prisma analytics log error:', error);
      throw new InternalServerErrorException('Could not save analytics event.');
    }
  }

  async getTotalVisitorsCount() {
    // Count distinct sessionId
    const result = await this.prisma.analyticsEvent.groupBy({
      by: ['sessionId'],
    });
    return result.length;
  }

  async getEventsByType(eventType: string) {
    return this.prisma.analyticsEvent.count({
      where: {
        eventType,
      },
    });
  }
}
