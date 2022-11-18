import { NestFactory } from '@nestjs/core';
import { DpoModule } from './dpo.module';

async function bootstrap() {
  const app = await NestFactory.create(DpoModule);
  await app.listen(3000);
}
bootstrap();
