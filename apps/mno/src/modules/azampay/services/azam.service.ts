import {
  APPENV,
  RestCheckout,
  RestDisbursement,
  RestNameLookup,
  RestPostCheckout,
  RestTransactionStatus,
} from '@flexpay/common';
import { Injectable } from '@nestjs/common';
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
    if (token.success) {
      return await token.mnoCheckout(
        payload.checkout as MnoCheckout,
        payload.options,
      );
    }
    return token as ErrorResponse;
  };
  bankCheckout = async (
    payload: RestCheckout,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const token = await azampay.getToken(this.getTokenPayload());
    if (token.success) {
      return await token.bankCheckout(
        payload.checkout as BankCheckout,
        payload.options,
      );
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
