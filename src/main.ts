import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerDefinition } from './docs.definition';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'nestjs-http-exception-filter';
import cookieParser from 'cookie-parser';

async function start() {
  const app = await NestFactory.create<NestApplication>(
    AppModule, /// disable trusting 'X-Forwarded-For'
  );

  app.enableCors();
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(<any>httpAdapterHost));

  if (!configService.get<boolean>('app.isDevelopment')) {
    const path = configService.get<string>('docs.path');

    app.useLogger(false);

    SwaggerModule.setup(
      path,
      app,
      SwaggerModule.createDocument(app, swaggerDefinition()),
    );
  }

  // Run the server
  await app.listen(
    configService.get<number>('app.port'),
    configService.get<string>('app.host'),
  );
}

start();
