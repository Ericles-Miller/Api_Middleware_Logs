import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './custom-logger';
import { LoggerController } from './logger.controller';
import { LoggerMiddleware } from './loggers-middleware';

@Module({
  imports: [LoggerModule.forRoot({ pinoHttp: { level: 'trace', autoLogging: false } })],
  controllers: [LoggerController],
  providers: [LoggerService, CustomLogger],
  exports: [CustomLogger],
})
export class LoggersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
