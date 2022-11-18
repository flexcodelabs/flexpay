import { NestFactory } from '@nestjs/core';
import { AirtelModule } from './airtel.module';

async function bootstrap() {
  const app = await NestFactory.create(AirtelModule);
  await app.listen(3000);
}
bootstrap();
