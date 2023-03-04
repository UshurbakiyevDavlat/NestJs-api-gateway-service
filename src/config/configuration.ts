import { Env } from 'src/core/utils/env';
import { server } from './server';
import { app } from './app';
import { AppConfig } from './app';
import { docs } from './docs';
import { grpc } from './grpc';

export default () => {
  Env.init();

  const config: any = {};
  const configParts = {
    app, // leave it here to have it available for underlying configurations
    server,
    docs,
    grpc,
  };

  for (const key in configParts) {
    config[key] = configParts[key](config);
  }

  // check production configuration
  if ((config.app as AppConfig).isProduction) {
    config.email.preview &&
      console.warn(
        'We recommend setting NODEMAILER_PREVIEW=false for a production environment!',
      );
    config.database.synchronize &&
      console.warn(
        'We recommend setting DB_SYNC=false for a production environment!',
      );
    config.logging.sentry ||
      console.warn(
        'We recommend enabling Sentry logging on a production environment by setting SENTRY_DSN!',
      );
    config.auth.confirmation ||
      console.warn(
        'We recommend setting AUTH_CONFIRMATION=true for a production environment!',
      );
  }

  return config;
};
