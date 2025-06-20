import { CreateOrder } from '@flexpay/common';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CheckoutResponse, ErrorResponse, MnoCheckout } from 'azampay';
import { Response } from 'express';
import { SelcomService } from '../services/selcom.service';

@Controller('api')
export class SelcomController {
  constructor(private service: SelcomService) {}

  @Post('selcomPush')
  async selcomPush(@Res() res: Response, @Body() payload: MnoCheckout) {
    const response: CheckoutResponse | ErrorResponse = await this.service.push(
      payload,
    );
    return res.status(response.statusCode).send(response);
  }

  @Post('selcomPush')
  async selcomCreateOrder(@Res() res: Response, @Body() payload: CreateOrder) {
    const response: CheckoutResponse | ErrorResponse =
      await this.service.createOrder(payload);
    return res.status(response.statusCode).send(response);
  }
}
