import winston, { Logger } from 'winston';

const logger = new Logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    })
  ]
});

export default logger;
