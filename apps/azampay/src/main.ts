import { NestFactory } from '@nestjs/core';
import { AzampayModule } from './azampay.module';

async function bootstrap() {
  const app = await NestFactory.create(AzampayModule);
  await app.listen(3000);
}
bootstrap();
