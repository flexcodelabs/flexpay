import { Controller, Get } from '@nestjs/common';
import { AirtelService } from './airtel.service';

@Controller()
export class AirtelController {
  constructor(private readonly airtelService: AirtelService) {}

  @Get()
  getHello(): string {
    return this.airtelService.getHello();
  }
}
