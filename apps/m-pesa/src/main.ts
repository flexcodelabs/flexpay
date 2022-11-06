import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpErrorFilter } from '@flexpay/common';
import { LoggingInterceptor } from '@flexpay/common';
import { MPesaModule } from './m-pesa.module';

async function bootstrap() {
  const app = await NestFactory.create(MPesaModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.debug(`MPesa listening on port: ${port}`, 'MPESA');
}
bootstrap();
