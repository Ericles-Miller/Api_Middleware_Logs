import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/logs-db'), LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
