import {
  BankCheckout,
  Disburse,
  MnoCheckout,
  NameLookup,
  PostCheckOut,
  RequestOptions,
  TransactionStatus,
} from 'azampay/lib/shared/interfaces/base.interface';

export interface RestCheckout {
  checkout: MnoCheckout | BankCheckout;
  options?: RequestOptions;
}

export interface RestDisbursement {
  disbursement: Disburse;
  options?: RequestOptions;
}

export interface RestNameLookup {
  nameLookup: NameLookup;
  options?: RequestOptions;
}

export interface RestTransactionStatus {
  transactionStatus: TransactionStatus;
  options?: RequestOptions;
}

export interface RestPostCheckout {
  postCheckout: PostCheckOut;
  options?: RequestOptions;
}

export interface PostCheckOutResponse {
  data: string;
  success: boolean;
  statusCode: number;
  [key: string]: unknown;
}
