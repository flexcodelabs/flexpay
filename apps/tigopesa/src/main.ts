import { NestFactory } from '@nestjs/core';
import { TigopesaModule } from './tigopesa.module';

async function bootstrap() {
  const app = await NestFactory.create(TigopesaModule);
  await app.listen(3000);
}
bootstrap();
