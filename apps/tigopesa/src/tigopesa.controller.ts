import { Controller, Get } from '@nestjs/common';
import { TigopesaService } from './tigopesa.service';

@Controller()
export class TigopesaController {
  constructor(private readonly tigopesaService: TigopesaService) {}

  @Get()
  getHello(): string {
    return this.tigopesaService.getHello();
  }
}
