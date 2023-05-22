import {
  RestCheckout,
  RestDisbursement,
  RestNameLookup,
  RestPostCheckout,
  RestTransactionStatus,
} from '@flexpay/common';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import {
  CheckoutResponse,
  DisburseResponse,
  ErrorResponse,
  NameLookupResponse,
  PartnersResponse,
  TransactionStatusResponse,
} from 'azampay/lib/shared/interfaces/base.interface';
import { Response } from 'express';
import { AzamService } from '../services/azam.service';

@Controller('api')
export class AzamController {
  constructor(private service: AzamService) {}

  @Get('partners')
  async partners(@Res() res: Response) {
    const response: PartnersResponse | ErrorResponse =
      await this.service.partners();
    return res.status(response.statusCode ?? HttpStatus.OK).send(response);
  }
  @Post('mnoCheckouts')
  async mnoCheckout(@Res() res: Response, @Body() payload: RestCheckout) {
    const response: CheckoutResponse | ErrorResponse =
      await this.service.mnoCheckout(payload);
    return res.status(response.statusCode).send(response);
  }
  @Post('bankCheckouts')
  async bankCheckout(@Res() res: Response, @Body() payload: RestCheckout) {
    const response: CheckoutResponse | ErrorResponse =
      await this.service.mnoCheckout(payload);
    return res.status(response.statusCode).send(response);
  }
  @Post('disbursements')
  async disbursement(@Res() res: Response, @Body() payload: RestDisbursement) {
    const response: DisburseResponse | ErrorResponse =
      await this.service.disbursement(payload);
    return res.status(response.statusCode).send(response);
  }

  @Post('nameLookups')
  async nameLookup(@Res() res: Response, @Body() payload: RestNameLookup) {
    const response: NameLookupResponse | ErrorResponse =
      await this.service.nameLookup(payload);
    return res.status(response.statusCode).send(response);
  }

  @Post('transactionStatuses')
  async transactionStatus(
    @Res() res: Response,
    @Body() payload: RestTransactionStatus,
  ) {
    const response: TransactionStatusResponse | ErrorResponse =
      await this.service.transactionStatus(payload);
    return res.status(response.statusCode).send(response);
  }
  @Post('postCheckouts')
  async postCheckout(@Res() res: Response, @Body() payload: RestPostCheckout) {
    const response = await this.service.postCheckout(payload);
    return res.status(response.statusCode).send(response);
  }
}
