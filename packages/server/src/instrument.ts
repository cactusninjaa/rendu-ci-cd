import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
  dsn: process.env.PROCESS_ENV,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
