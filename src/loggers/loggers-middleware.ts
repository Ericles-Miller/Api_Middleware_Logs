import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import { differenceInMilliseconds } from 'date-fns';
import { CustomLogger } from './custom-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logsService: LoggerService,
    private readonly customLogger: CustomLogger,
  ) {}

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { method, originalUrl, ip } = request;
    const startTimeRequest = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const movieId = request.params.movieid;
      const timeRequest = differenceInMilliseconds(startTimeRequest, Date.now());

      const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

      this.logsService.logRequest(method, originalUrl, statusCode, ip, level, timeRequest, movieId);

      if (level === 'error') {
        this.customLogger.error(
          `${method} ${originalUrl} ${statusCode}  TimeRequest ${timeRequest} mil - IP: ${ip} - Movie ID: ${movieId || 'N/A'}`,
          'HTTP',
        );
      } else if (level === 'warn') {
        this.customLogger.warn(
          `${method} ${originalUrl} ${statusCode} TimeRequest ${timeRequest} mil - IP: ${ip} - Movie ID: ${movieId || 'N/A'}`,
          'HTTP',
        );
      } else if (level === 'info') {
        this.customLogger.log(
          `${method} ${originalUrl} ${statusCode} TimeRequest ${timeRequest} mil - IP: ${ip} - Movie ID: ${movieId || 'N/A'}`,
          'HTTP',
        );
      } else if (level === 'debug') {
        this.customLogger.debug(
          `${method} ${originalUrl} ${statusCode} TimeRequest ${timeRequest} mil - IP: ${ip} - Movie ID: ${movieId || 'N/A'}`,
          'HTTP',
        );
      } else {
        this.customLogger.verbose(
          `${method} ${originalUrl} ${statusCode} TimeRequest ${timeRequest} mil - IP: ${ip} - Movie ID: ${movieId || 'N/A'}`,
          'HTTP',
        );
      }
    });

    next();
  }
}
