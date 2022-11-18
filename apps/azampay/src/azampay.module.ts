import { Module } from '@nestjs/common';
import { AzampayController } from './azampay.controller';
import { AzampayService } from './azampay.service';

@Module({
  imports: [],
  controllers: [AzampayController],
  providers: [AzampayService],
})
export class AzampayModule {}
