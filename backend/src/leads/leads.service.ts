import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    try {
      const lead = await this.prisma.lead.create({
        data: {
          name: createLeadDto.name,
          mobile: createLeadDto.mobile,
          email: createLeadDto.email,
          state: createLeadDto.state,
          city: createLeadDto.city,
          quantity: createLeadDto.quantity,
          source: createLeadDto.source || null,
          campaign: createLeadDto.campaign || null,
          medium: createLeadDto.medium || null,
        },
      });

      // Asynchronously trigger emails in background (so request resolves quickly)
      this.mailService.sendAdminNotification(lead).catch((err) => {
        console.error('Mail notification to admin failed:', err);
      });
      this.mailService.sendCustomerConfirmation(lead.email, lead.name, lead.quantity).catch((err) => {
        console.error('Mail confirmation to customer failed:', err);
      });

      return lead;
    } catch (error) {
      console.error('Prisma lead creation error:', error);
      throw new InternalServerErrorException('Could not register reservation. Please try again.');
    }
  }

  async getRecentLeads(limit: number = 50) {
    return this.prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async getTotalLeadsCount() {
    return this.prisma.lead.count();
  }

  async getTotalQuantityRequested() {
    const aggregate = await this.prisma.lead.aggregate({
      _sum: {
        quantity: true,
      },
    });
    return aggregate._sum.quantity || 0;
  }

  async getTopStates(limit: number = 5) {
    const result = await this.prisma.lead.groupBy({
      by: ['state'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });
    return result.map((item) => ({
      state: item.state,
      count: item._count.id,
    }));
  }

  async getTopSources(limit: number = 5) {
    const result = await this.prisma.lead.groupBy({
      by: ['source'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: limit,
    });
    return result.map((item) => ({
      source: item.source || 'Direct / Organic',
      count: item._count.id,
    }));
  }
}
