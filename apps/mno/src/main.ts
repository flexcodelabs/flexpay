import {
  HttpErrorFilter,
  LoggingInterceptor,
  RmqService,
  APPENV,
} from '@flexpay/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MnoModule } from './mno.module';

async function bootstrap() {
  if (
    APPENV.ALLOW_MS?.toString()?.toLowerCase() !== 'true' &&
    APPENV.ALLOW_REST?.toString()?.toLowerCase() !== 'true'
  ) {
    Logger.error('NO ENVIRONMENT SPECIFIED', 'ERROR');
    throw new Error('MISSING ENV');
  }
  const app = await NestFactory.create(MnoModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );

  if (APPENV.ALLOW_MS?.toString()?.toLowerCase() === 'true') {
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('MNO'));
    await app.startAllMicroservices();
    Logger.debug('MNO MICROSERVICE IS UP', 'MNO');
  }

  if (APPENV.ALLOW_REST?.toString()?.toLowerCase() === 'true') {
    await app.listen(APPENV.PORT);
    Logger.debug(`MNO API LISTENING ON PORT: ${APPENV.PORT}`, 'MNO');
  }
}
bootstrap();
