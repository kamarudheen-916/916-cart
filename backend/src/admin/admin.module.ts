import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LeadsModule } from '../leads/leads.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [ConfigModule, LeadsModule, AnalyticsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
