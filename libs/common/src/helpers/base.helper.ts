import { HttpStatus, Logger } from '@nestjs/common';
import { BaseRequest } from '../interfaces/shared.interface';

export const throwError = (error: any) => {
  throw error;
};

export const phoneNumber = (phone: string) => {
  if (!phone || phone.length < 9) return { valid: false, value: phone };

  phone = phone.replace(/[^\w\s]/gi, '');

  let withCode = phone;
  let withoutCode = phone;
  let withOutPlus = phone;

  if (phone.startsWith('+255')) {
    withoutCode = phone.replace('+255', '0');
    withOutPlus = phone.replace('+', '');
    withCode = phone;
  } else if (phone.startsWith('255')) {
    withoutCode = phone.replace(/^255/, '0');
    withCode = `+${phone}`;
  } else if (!phone.startsWith('0') && phone.length === 9) {
    withoutCode = `0${phone}`;
    withCode = `+255${phone}`;
    withOutPlus = `255${phone}`;
  } else if (phone.startsWith('0')) {
    withoutCode = phone;
    withCode = `+255${phone.substring(1)}`;
    withOutPlus = `255${phone.substring(1)}`;
  }

  return {
    valid: true,
    value: withoutCode,
    withCode,
    withOutPlus,
  };
};

const logResponse = async (response: Response) => {
  try {
    if (response) {
      Logger.error(response.statusText, 'RESPONSE TEXT');
      Logger.error(response.status, 'RESPONSE STATUS');
      Logger.error(response.url, 'RESPONSE URL');
      if (response.ok) {
        console.log(await response.text());
        console.log(await response.json());
      }
    }
  } catch (e) {
    Logger.error(e.message, 'ERROR LOGGING RESPONSE');
    console.log(e);
  }
};

export const requestResource = async (
  request: BaseRequest,
  requests = 0,
): Promise<any> => {
  let response: Response;
  try {
    response = await fetch(request.resource, {
      ...request,
    });
    const status = response.status;
    response = await response.json();
    if (status >= 400) {
      Logger.error(status, 'ERROR RESPONSE');
      console.log('ERROR RESPONSE', JSON.stringify(response));
    }
    Logger.debug('REQUEST SUCCESSFUL', 'SUCCESS');
    Logger.debug(`${request.method} ${request.resource}`, 'URL');
    return { ...response, status, statusCode: status };
  } catch (e) {
    if (requests <= 5) {
      return await requestResource(request, requests + 1);
    }
    logResponse(response);
    Logger.debug(`URL: ${request.resource}`, 'ERROR URL');
    console.log(e);
    return {
      error: e.message,
      message: e.message,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
};
