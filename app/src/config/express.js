import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import helmet from 'helmet';
import expressWinston from 'express-winston';
import path from 'path';

import config from './env';
import winstonInstance from './winston';
import routes from '../modules/routes';
import passportInit from './passport';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(helmet());
app.use(cors());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, '../public')))

if (config.env === 'development') {
  app.use(expressWinston.logger({
    winstonInstance,
    colorStatus: true
  }));
}

if (config.securityMode) {
  passportInit(app);
}

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error();
  err.message = 'API not found!';
  err.status = httpStatus.NOT_FOUND;
  return next(err);
});

if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

export default app;
