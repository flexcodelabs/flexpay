import {
  APPENV,
  RestCheckout,
  RestDisbursement,
  RestNameLookup,
  RestPostCheckout,
  RestTransactionStatus,
} from '@flexpay/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import azampay from 'azampay';
import {
  BankCheckout,
  CheckoutResponse,
  DisburseResponse,
  ErrorResponse,
  MnoCheckout,
  NameLookupResponse,
  PartnersResponse,
  PostCheckOutInterface,
  TokenResponse,
  TransactionStatusResponse,
} from 'azampay/lib/shared/interfaces/base.interface';

@Injectable()
export class AzamService {
  partners = async (): Promise<PartnersResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return (await token.partners()) as PartnersResponse | ErrorResponse;
    }
    return token as ErrorResponse;
  };
  mnoCheckout = async (
    payload: RestCheckout,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    console.log(token);
    if (token.success) {
      return await this.getMnoCheckout(payload, token);
    }
    return token as ErrorResponse;
  };
  bankCheckout = async (
    payload: RestCheckout,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return await this.getBankCheckout(payload, token);
    }
    return token as ErrorResponse;
  };

  disbursement = async (
    payload: RestDisbursement,
  ): Promise<DisburseResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return await token.disburse(payload.disbursement, payload.options);
    }
    return token as ErrorResponse;
  };

  nameLookup = async (
    payload: RestNameLookup,
  ): Promise<NameLookupResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return await token.nameLookup(payload.nameLookup, payload.options);
    }
    return token as ErrorResponse;
  };
  transactionStatus = async (
    payload: RestTransactionStatus,
  ): Promise<TransactionStatusResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return await token.transactionStatus(
        payload.transactionStatus,
        payload.options,
      );
    }
    return token as ErrorResponse;
  };

  postCheckout = async (
    payload: RestPostCheckout,
  ): Promise<PostCheckOutInterface | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return (await token.postCheckout(
        payload.postCheckout,
        payload.options,
      )) as PostCheckOutInterface;
    }
    return token as ErrorResponse;
  };

  private getBankCheckout = async (
    payload: RestCheckout,
    token: TokenResponse | ErrorResponse,
  ) => {
    const bankCheckout = await token.bankCheckout(
      payload.checkout as BankCheckout,
      payload.options,
    );
    if (bankCheckout.success && bankCheckout?.transactionId?.length > 4) {
      return bankCheckout;
    }
    return {
      ...bankCheckout,
      statusCode: HttpStatus.BAD_REQUEST,
      status: HttpStatus.BAD_REQUEST,
    };
  };
  private getMnoCheckout = async (
    payload: RestCheckout,
    token: TokenResponse | ErrorResponse,
  ) => {
    const bankCheckout = await token.mnoCheckout(
      payload.checkout as MnoCheckout,
      payload.options,
    );
    if (bankCheckout.success && bankCheckout?.transactionId?.length > 4) {
      return bankCheckout;
    }
    return {
      ...bankCheckout,
      statusCode: HttpStatus.BAD_REQUEST,
      status: HttpStatus.BAD_REQUEST,
    };
  };

  private getTokenPayload = () => {
    return {
      env: APPENV.AZAMPAY_ENV,
      clientId: APPENV.AZAMPAY_CLIENTID,
      appName: APPENV.AZAMPAY_APPNAME,
      apiKey: APPENV.AZAMPAY_APIKEY,
      clientSecret: APPENV.AZAMPAY_SECRET,
    };
  };
}
