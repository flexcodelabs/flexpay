import { readFileSync } from 'fs';

const config = () => {
  try {
    const jsonData = readFileSync('./config.json', 'utf8');
    return JSON.parse(jsonData);
  } catch (e) {
    return {};
  }
};

const data = config();

export const APPENV = {
  /**
   * Expose over rest API
   */
  ALLOW_REST: process.env.ALLOW_REST ?? data.ALLOW_REST,

  /**
   * Expose over rest Microservice
   */
  ALLOW_MS: process.env.ALLOW_MS ?? data.ALLOW_MS,

  /**
   * Expose over Rest Port
   */
  PORT: process.env.PORT ?? data.PORT ?? 3001,

  /**
   * Save results
   */
  SAVE_RESULTS: process.env.SAVE_RESULTS ?? data.SAVE_RESULTS,

  /**
   * MNO service name
   */
  MS_SERVICE_NAME: process.env.MS_SERVICE_NAME ?? data.MS_SERVICE_NAME ?? 'MNO',

  /**
   * Azam Pay Environment SANDBOX | LIVE
   */
  AZAMPAY_ENV: (process.env.AZAMPAY_ENV ?? data.AZAMPAY_ENV) as
    | 'SANDBOX'
    | 'LIVE',

  /**
   * Azam Pay Client Id
   */
  AZAMPAY_CLIENTID: process.env.AZAMPAY_CLIENTID ?? data.AZAMPAY_CLIENTID,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_APPNAME: process.env.AZAMPAY_APPNAME ?? data.AZAMPAY_APPNAME,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_SECRET: process.env.AZAMPAY_SECRET ?? data.AZAMPAY_SECRET,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_APIKEY: process.env.AZAMPAY_APIKEY ?? data.AZAMPAY_APIKEY,
};
