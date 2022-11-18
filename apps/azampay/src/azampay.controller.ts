import { Controller, Get } from '@nestjs/common';
import { AzampayService } from './azampay.service';

@Controller()
export class AzampayController {
  constructor(private readonly azampayService: AzampayService) {}

  @Get()
  getHello(): string {
    return this.azampayService.getHello();
  }
}
