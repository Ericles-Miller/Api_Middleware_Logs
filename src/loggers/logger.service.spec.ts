import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { Model } from 'mongoose';
import { Logger } from './entities/logger.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('LoggerService', () => {
  let service: LoggerService;
  let logModel: Model<Logger>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: getModelToken('Logger'),
          useValue: {
            logRequest: jest.fn().getMockImplementation(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
    logModel = module.get<Model<Logger>>(getModelToken('Logger'));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
    expect(logModel).toBeDefined();
  });

  describe('logRequest', () => {
    it('deve criar um novo log de info com sucesso', async () => {
      const log = {
        method: 'GET',
        url: 'http://localhost:3000/logs',
        statusCode: 200,
        ip: '127.0.0.1',
        level: 'info',
        timeRequest: 100,
        movieId: '',
      };

      const spy = jest.spyOn(service.logRequest, logModel. )

      await service.logRequest(
        log.method,
        log.url,
        log.statusCode,
        log.ip,
        log.level,
        log.timeRequest,
        log.movieId,
      );

      expect(logModel.constructor).toHaveBeenCalledWith(log);

      // Verifica se `save()` foi chamado na instância criada
      expect(logModel.constructor().save).toHaveBeenCalled();
    });
  });
});
