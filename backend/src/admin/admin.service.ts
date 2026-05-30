import { Injectable } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class AdminService {
  constructor(
    private leadsService: LeadsService,
    private analyticsService: AnalyticsService,
  ) {}

  async getDashboardStats() {
    const [totalVisitors, totalLeads, totalQuantity, topStates, topSources, recentLeads] = await Promise.all([
      this.analyticsService.getTotalVisitorsCount(),
      this.leadsService.getTotalLeadsCount(),
      this.leadsService.getTotalQuantityRequested(),
      this.leadsService.getTopStates(5),
      this.leadsService.getTopSources(5),
      this.leadsService.getRecentLeads(20),
    ]);

    const conversionRate = totalVisitors > 0 ? Number(((totalLeads / totalVisitors) * 100).toFixed(2)) : 0;

    return {
      totalVisitors,
      totalLeads,
      conversionRate,
      totalQuantityRequested: totalQuantity,
      topStates,
      topTrafficSources: topSources,
      recentLeads,
    };
  }
}
