import { Controller, Post, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  async logEvent(@Body() createEventDto: CreateEventDto) {
    return this.analyticsService.create(createEventDto);
  }
}
