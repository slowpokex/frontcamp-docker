import winston, { Logger } from 'winston';

const logger = new Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    })
  ]
});

export default logger;
