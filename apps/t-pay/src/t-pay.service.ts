import { Injectable } from '@nestjs/common';

@Injectable()
export class TPayService {
  getHello(): string {
    return 'Hello World!';
  }
}
