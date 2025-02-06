import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Logger } from './entities/logger.entity';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './custom-logger';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerController } from './logger.controller';
import { LoggerMiddleware } from './loggers-middleware';
import { LoggerSchema } from './logger-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logger.name, schema: LoggerSchema }]),
    LoggerModule.forRoot({ pinoHttp: { level: 'trace', autoLogging: false } }),
  ],
  controllers: [LoggerController],
  providers: [LoggerService, CustomLogger],
  exports: [CustomLogger],
})
export class LoggersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
