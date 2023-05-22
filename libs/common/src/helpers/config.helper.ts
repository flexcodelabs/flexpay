export const APPENV = {
  /**
   * Expose over rest API
   */
  ALLOW_REST: process.env.ALLOW_REST,

  /**
   * Expose over rest Microservice
   */
  ALLOW_MS: process.env.ALLOW_MS,

  /**
   * Expose over Rest Port
   */
  PORT: process.env.PORT ?? 3001,

  /**
   * Save results
   */
  SAVE_RESULTS: process.env.SAVE_RESULTS,

  /**
   * MNO service name
   */
  MS_SERVICE_NAME: process.env.MS_SERVICE_NAME ?? 'MNO',

  /**
   * Azam Pay Environment SANDBOX | LIVE
   */
  AZAMPAY_ENV: process.env.AZAMPAY_ENV as 'SANDBOX' | 'LIVE',

  /**
   * Azam Pay Client Id
   */
  AZAMPAY_CLIENTID: process.env.AZAMPAY_CLIENTID,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_APPNAME: process.env.AZAMPAY_APPNAME,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_SECRET: process.env.AZAMPAY_SECRET,

  /**
   * Azam Pay App Name
   */
  AZAMPAY_APIKEY: process.env.AZAMPAY_APIKEY,
};
