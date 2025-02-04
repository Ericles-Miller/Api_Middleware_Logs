import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './Custon-logger';

@Module({
  imports: [LoggerModule.forRoot({ pinoHttp: { level: 'trace' } })],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}
