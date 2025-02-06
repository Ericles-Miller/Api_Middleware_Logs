import { Module } from '@nestjs/common';
import { LoggersModule } from './loggers/loggers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/dataSource';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), LoggersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
