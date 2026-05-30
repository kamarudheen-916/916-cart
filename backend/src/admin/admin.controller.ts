import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private configService: ConfigService,
  ) {}

  @Get('stats')
  async getStats(@Headers('x-admin-password') adminPasswordHeader: string) {
    const requiredPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminPasswordHeader || adminPasswordHeader !== requiredPassword) {
      throw new UnauthorizedException('Unauthorized access. Invalid admin password.');
    }

    return this.adminService.getDashboardStats();
  }
}
