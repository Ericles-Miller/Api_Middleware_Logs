import { Module } from '@nestjs/common';
import { LoggersModule } from './loggers/loggers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/logs-db'), LoggersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
