import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/status')
  getStatus() {
    return { status: 'OK' };
  }

  @Get()
  getHome() {
    return { status: 'OK' };
  }
}
