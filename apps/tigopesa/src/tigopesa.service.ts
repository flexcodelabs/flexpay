import { Injectable } from '@nestjs/common';

@Injectable()
export class TigopesaService {
  getHello(): string {
    return 'Hello World!';
  }
}
