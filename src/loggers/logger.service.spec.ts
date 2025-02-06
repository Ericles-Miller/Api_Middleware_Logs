import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { Model } from 'mongoose';
import { Logger } from './entities/logger.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('LogsService', () => {
  let service: LoggerService;
  let logModel: Model<Logger>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: getModelToken('Logger'),
          useValue: {
            logRequest: jest.fn(),
            getLogs: jest.fn(),
            findLog: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
    logModel = module.get<Model<Logger>>(getModelToken('Log'));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
    expect(logModel).toBeDefined();
  });

  describe('logRequest', () => {
    it('should be create a new log of info, with success', async () => {
      const log = {
        method: 'GET',
        url: 'http://localhost:3000/logs',
        statusCode: 200,
        ip: '127.0.0.1',
        level: 'info',
        timeRequest: 100,
        movieId: '',
      };

      await service.logRequest(
        log.method,
        log.url,
        log.statusCode,
        log.ip,
        log.level,
        log.timeRequest,
        log.movieId,
      );

      expect(service.logRequest).toHaveBeenCalledTimes(1);
    });
  });
});
