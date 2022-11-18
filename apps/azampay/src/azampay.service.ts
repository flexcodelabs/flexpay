import { Injectable } from '@nestjs/common';

@Injectable()
export class AzampayService {
  getHello(): string {
    return 'Hello World!';
  }
}
