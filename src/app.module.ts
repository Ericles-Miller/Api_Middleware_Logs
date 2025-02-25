import { Module } from '@nestjs/common';
import { LoggersModule } from './loggers/loggers.module';

@Module({
  imports: [LoggersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
