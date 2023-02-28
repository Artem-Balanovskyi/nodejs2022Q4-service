import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
import { LoggerService } from './logger/logger.service';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // logger: new LoggerService(),
    // logger: new LoggerService(),
  });

  // app.useLogger(app.get(LoggerService));
  app.useLogger(new LoggerService());

  const document: any = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
