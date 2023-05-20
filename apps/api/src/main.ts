import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpErrorFilter } from '@flexpay/common';
import { LoggingInterceptor } from '@flexpay/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.disable('x-powered-by');
  app.use(
    session({
      secret: process.env.SESSION_SCRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.debug(`API listening on port: ${port}`, 'API');
}
bootstrap();
