import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.verbose('Test verbose message');
    this.logger.debug('Test debug message');
    this.logger.log('Test log message');
    this.logger.warn('Test warn message');
    this.logger.error('Test error message');
    return 'Logger test complete';
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return { id, nome: 'Example Name Movie' };
  }
}
