import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Logger } from './entities/logger.entity';
import { ELoggerLevel } from './logger-level.enum';

@Injectable()
export class LoggerService {
  constructor() {}

  async logRequest(
    method: string,
    url: string,
    statusCode: number,
    ip: string,
    level: ELoggerLevel,
    timeRequest: number,
    userAgent: string,
    referer?: string,
    userId?: string,
  ): Promise<void> {
    try {
      const log = new Logger(method, url, statusCode, ip, level, timeRequest, userAgent, referer, userId);

      await this.logRepository.save(log);
    } catch {
      throw new InternalServerErrorException('Error saving log');
    }
  }

  async getLogs(): Promise<Logger[]> {
    try {
      return await this.logRepository.find();
    } catch {
      throw new InternalServerErrorException('Error finding log');
    }
  }

  async findLog(id: string): Promise<Logger> {
    try {
      const log = await this.logRepository.findOne({ where: { id } });

      if (!log) {
        throw new NotFoundException('id of log does not exists');
      }
      return log;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error finding log');
    }
  }
}
