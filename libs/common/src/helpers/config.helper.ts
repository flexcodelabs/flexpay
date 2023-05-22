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
};
