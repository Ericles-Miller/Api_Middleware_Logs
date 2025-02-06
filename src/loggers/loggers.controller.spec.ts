import { Test, TestingModule } from '@nestjs/testing';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { Logger } from './entities/logger.entity';
import { ELoggerLevel } from './logger-level.enum';

describe('LogsController', () => {
  let controller: LoggerController;
  let service: LoggerService;
  const loggers: Logger[] = [
    {
      id: '335ecab5-4e51-4bfe-9e3b-4dd115e7a47b',
      method: 'GET',
      url: 'http://localhost:3000/logs',
      statusCode: 200,
      ip: '127.0.0.1',
      level: ELoggerLevel.INFO,
      timeRequest: 100,
      movieId: '',
      timestamp: new Date(),
    },
  ];

  const log: Logger = {
    id: '335ecab5-4e51-4bfe-9e3b-4dd115e7a47b',
    method: 'GET',
    url: 'http://localhost:3000/logs',
    statusCode: 200,
    ip: '127.0.0.1',
    level: ELoggerLevel.INFO,
    timeRequest: 100,
    movieId: '',
    timestamp: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [
        {
          provide: LoggerService,
          useValue: {
            getLogs: jest.fn().mockReturnValue(loggers),
            getLogById: jest.fn().mockReturnValue(log),
          },
        },
      ],
    }).compile();

    controller = module.get<LoggerController>(LoggerController);
    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
