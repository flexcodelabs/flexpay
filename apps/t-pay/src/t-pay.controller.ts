import { Controller, Get } from '@nestjs/common';
import { TPayService } from './t-pay.service';

@Controller()
export class TPayController {
  constructor(private readonly tPayService: TPayService) {}

  @Get()
  getHello(): string {
    return this.tPayService.getHello();
  }
}
