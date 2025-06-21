import {
  APPENV,
  CreateOrder,
  phoneNumber,
  requestResource,
} from '@flexpay/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CheckoutResponse, ErrorResponse, MnoCheckout } from 'azampay';
import * as crypto from 'crypto';

// Types
type SelcomPayload = Record<string, string>;
type Headers = Record<string, string>;
// ======= Config & Execution ======= //
const apiKey = APPENV.SELCOM_APIKEY;
const apiSecret = APPENV.SELCOM_APISECRET;
const baseUrl = APPENV.SELCOM_APIURL;
const vendor = APPENV.SELCOM_VENDOR;
const authorization = Buffer.from(apiKey, 'ascii').toString('base64');

@Injectable()
export class SelcomService {
  /**
   * Compute HS256 Signature
   * @param params - Payload parameters
   * @param signedFields - Comma-separated keys to be signed
   * @param timestamp - ISO timestamp
   * @param apiSecret - Your API secret
   * @returns Base64-encoded signature string
   */
  computeSignature = (
    params: SelcomPayload,
    signedFields: string,
    timestamp: string,
    apiSecret: string,
  ): string => {
    const fields = signedFields.split(',');
    const signingString = [
      `timestamp=${timestamp}`,
      ...fields.map((field) => `${field}=${params[field]}`),
    ].join('&');

    return crypto
      .createHmac('sha256', apiSecret)
      .update(signingString)
      .digest('base64');
  };

  /**
   * Send POST request to SELCOM API
   * @param url - API endpoint
   * @param payload - Payload to send
   * @param headers - Authorization headers
   * @returns JSON response
   */
  sendSelcomRequest = async (
    url: string,
    payload: SelcomPayload,
    headers: Headers,
  ): Promise<any> => {
    const res = await requestResource({
      resource: url,
      headers,
      body: JSON.stringify(payload),
      method: 'POST',
    });
    console.log(res);
    return res;
  };

  /**
   *
   * @param payload: CreateOrder
   * @returns CheckoutResponse | ErrorResponse
   */

  createOrder = async (
    payload: CreateOrder,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const url = `${baseUrl}/checkout/create-order-minimal`;
    const signedFields = Object.keys(payload).join(',');
    const headers: Headers = this.headers(payload as any, signedFields);
    const result = await this.sendSelcomRequest(url, payload as any, headers);
    console.log(JSON.stringify(result));
    return result;
  };

  /**
   * @param request
   * @returns CheckoutResponse | ErrorResponse
   */

  push = async (
    request: MnoCheckout,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const { valid, withOutPlus } = phoneNumber(request.accountNumber);
    if (!valid) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid account number',
        success: false,
        code: 'FAIL',
      } as unknown as CheckoutResponse | ErrorResponse;
    }
    const order = await this.createOrder({
      order_id: request.externalId,
      amount: request.amount,
      buyer_email: request.additionalProperties?.email ?? 'benny@example.com',
      buyer_name: request.additionalProperties?.name ?? 'Benny',
      buyer_phone: withOutPlus,
      currency: request.currency ?? 'TZS',
      buyer_remarks: request.additionalProperties?.buyer_remarks ?? 'None',
      merchant_remarks:
        request.additionalProperties?.merchant_remarks ?? 'None',
      no_of_items: request.additionalProperties?.items ?? 1,
      vendor,
    } as unknown as CreateOrder);
    console.log(JSON.stringify(order));
    const url = `${baseUrl}/checkout/wallet-payment`;
    const payload: SelcomPayload = {
      transid: request.externalId,
      msisdn: withOutPlus,
      order_id: request.externalId,
    };
    const signedFields = Object.keys(payload).join(',');
    const headers: Headers = this.headers(payload, signedFields);
    const result = await this.sendSelcomRequest(url, payload, headers);
    console.log(JSON.stringify(result));
    return result;
  };

  headers = (payload: SelcomPayload, signedFields: string): Headers => {
    const timestamp = new Date().toISOString();

    const digest = this.computeSignature(
      payload,
      signedFields,
      timestamp,
      apiSecret,
    );
    return {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Digest-Method': 'HS256',
      Authorization: `SELCOM ${authorization}`,
      Digest: digest,
      Timestamp: timestamp,
      'Signed-Fields': signedFields,
    };
  };
}
