import { Controller, Get } from '@nestjs/common';
import { DpoService } from './dpo.service';

@Controller()
export class DpoController {
  constructor(private readonly dpoService: DpoService) {}

  @Get()
  getHello(): string {
    return this.dpoService.getHello();
  }
}
