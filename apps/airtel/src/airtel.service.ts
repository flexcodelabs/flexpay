import { Injectable } from '@nestjs/common';

@Injectable()
export class AirtelService {
  getHello(): string {
    return 'Hello World!';
  }
}
