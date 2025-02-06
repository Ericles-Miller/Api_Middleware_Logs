import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logger } from './entities/logger.entity';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Logger.name) private readonly logModel: Model<Logger>) {}

  async logRequest(
    method: string,
    url: string,
    statusCode: number,
    ip: string,
    level: string,
    timeRequest: number,
    movieId?: string,
  ): Promise<void> {
    const log = new this.logModel({
      method,
      url,
      statusCode,
      level,
      movieId,
      ip,
      timeRequest,
    });

    await log.save();
  }

  async getLogs(): Promise<Logger[]> {
    try {
      return await this.logModel.find().exec();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error finding log');
    }
  }

  async findLog(id: string): Promise<Logger> {
    try {
      const log = await this.logModel.findOne({ _id: new Types.ObjectId(id) }).exec();

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
