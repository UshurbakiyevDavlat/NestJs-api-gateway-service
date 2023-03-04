import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter } from 'nestjs-http-exception-filter';

async function start() {
  const app = await NestFactory.create<NestApplication>(
    AppModule, /// disable trusting 'X-Forwarded-For'
  );

  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(<any>httpAdapterHost));

  // Run the server
  await app.listen(
    configService.get<number>('app.port'),
    configService.get<string>('app.host'),
  );
}

start();
