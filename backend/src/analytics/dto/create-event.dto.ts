import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  eventType: string; // 'page_visit' | 'button_click' | 'modal_open' | 'lead_submission'

  @IsNotEmpty()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  campaign?: string;

  @IsOptional()
  @IsString()
  medium?: string;
}
