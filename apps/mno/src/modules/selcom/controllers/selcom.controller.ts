import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  CheckoutResponse,
  ErrorResponse,
  MnoCheckout,
} from 'azampay/lib/shared/interfaces/base.interface';
import { SelcomService } from '../services/selcom.service';
import { Response } from 'express';

@Controller('api')
export class SelcomController {
  constructor(private service: SelcomService) {}

  @Post('selcomPush')
  async mnoCheckout(@Res() res: Response, @Body() payload: MnoCheckout) {
    const response: CheckoutResponse | ErrorResponse =
      await this.service.selcomPush(payload);
    return res.status(response.statusCode).send(response);
  }
}
