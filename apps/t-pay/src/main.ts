import { NestFactory } from '@nestjs/core';
import { TPayModule } from './t-pay.module';

async function bootstrap() {
  const app = await NestFactory.create(TPayModule);
  await app.listen(3000);
}
bootstrap();
