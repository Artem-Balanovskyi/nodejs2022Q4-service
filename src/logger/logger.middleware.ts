import { Injectable, Logger, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, query, body } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', async () => {
      const { statusCode } = res;
      const message = `${method} ${baseUrl} queries: ${JSON.stringify(
        query,
      )} body: ${JSON.stringify(
        body,
      )} - status code: ${statusCode} - ${userAgent}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message);
      } else if (
        statusCode >= HttpStatus.BAD_REQUEST &&
        statusCode < HttpStatus.INTERNAL_SERVER_ERROR
      ) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
