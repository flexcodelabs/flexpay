import { APPENV, phoneNumber } from '@flexpay/common';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CheckoutResponse,
  MnoCheckout,
  ErrorResponse,
} from 'azampay/lib/shared/interfaces/base.interface';
import * as crypto from 'crypto';

// Types
type SelcomPayload = Record<string, string>;
type Headers = Record<string, string>;

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
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      Logger.debug(`SELCOM Error: ${text}`, 'SELCOM');
      return { text };
    }
    return response.json();
  };

  selcomPush = async (
    request: MnoCheckout,
  ): Promise<CheckoutResponse | ErrorResponse> => {
    const { valid, value, withCode } = phoneNumber(request.accountNumber);
    if (!valid) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid account number',
        success: false,
        code: 'FAIL',
      } as unknown as CheckoutResponse | ErrorResponse;
    }
    // ======= Config & Execution ======= //
    const apiKey = APPENV.SELCOM_APIKEY;
    const apiSecret = APPENV.SELCOM_APISECRET;

    const url = `${APPENV.SELCOM_APIURL}/wallet-payment`;

    const payload: SelcomPayload = {
      utilityref: value,
      transid: request.externalId,
      amount: request.amount,
      vendor: APPENV.SELCOM_VENDOR,
      msisdn: withCode,
    };

    const authorization = Buffer.from(apiKey).toString('hex');
    const timestamp = new Date().toISOString();
    const signedFields = Object.keys(payload).join(',');
    const digest = this.computeSignature(
      payload,
      signedFields,
      timestamp,
      apiSecret,
    );

    const headers: Headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Digest-Method': 'HS256',
      Authorization: `SELCOM ${authorization}`,
      Digest: digest,
      Timestamp: timestamp,
      'Signed-Fields': signedFields,
    };
    const result = await this.sendSelcomRequest(url, payload, headers);
    console.log(JSON.stringify(result, null, 2));
    return result;
  };
}
