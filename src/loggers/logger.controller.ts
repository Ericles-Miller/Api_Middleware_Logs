import { Controller, Get, HttpCode } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logs')
export class LoggerController {
  constructor(private readonly logsService: LoggerService) {}

  @Get('')
  @HttpCode(200)
  async getLogs(): Promise<string> {
    return 'Testing endpoint to generate logs';
  }
}
