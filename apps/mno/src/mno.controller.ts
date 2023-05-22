import { Controller, Get } from '@nestjs/common';

@Controller()
export class MnoController {
  @Get('api/status')
  getHello() {
    return { status: 'OK', message: 'API Running' };
  }
}
