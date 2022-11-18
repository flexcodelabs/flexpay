import { Injectable } from '@nestjs/common';

@Injectable()
export class DpoService {
  getHello(): string {
    return 'Hello World!';
  }
}
