import { Module } from '@nestjs/common';
import { AirtelController } from './airtel.controller';
import { AirtelService } from './airtel.service';

@Module({
  imports: [],
  controllers: [AirtelController],
  providers: [AirtelService],
})
export class AirtelModule {}
