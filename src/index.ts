import 'dotenv/config';
import { gracefulShutdownInterruption, gracefulShutdownException } from './helpers/gracefulShutdown';
import app from './app';

const PORT = process.env.APP_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';

const server = app.listen(PORT, async () => {
  console.log(`App started on PORT ${PORT} ENV [${NODE_ENV}]`);
});

process
  .on('SIGINT', gracefulShutdownInterruption('SIGINT', server))
  .on('SIGTERM', gracefulShutdownInterruption('SIGTERM', server))
  .on('exit', gracefulShutdownInterruption('exit', server))
  .on('uncaughtException', gracefulShutdownException)
  .on('unhandledRejection', gracefulShutdownException)
  .on('uncaughtExceptionMonitor', gracefulShutdownException);
