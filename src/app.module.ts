import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './Custon-logger';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/logs-db'),
    LoggerModule.forRoot({ pinoHttp: { level: 'trace' } }),
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}
