import { Module } from '@nestjs/common';
import { TPayController } from './t-pay.controller';
import { TPayService } from './t-pay.service';

@Module({
  imports: [],
  controllers: [TPayController],
  providers: [TPayService],
})
export class TPayModule {}
