import express from 'express';
import bodyParser, { json } from 'body-parser';
import cookieParser from 'cookie-parser';
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(helmet());
app.use(cors());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Static content
app.use('/public', express.static(path.join(__dirname, '../public')))
// Need for getting bootstrap
app.use('/bootstrap', express.static(path.dirname(require.resolve('bootstrap')).split(path.sep).slice(0, -2).join(path.sep)));

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
  return res.render('error', { 
    code: 404, 
    head: 'Page not found', 
    message: 'Something goes wrong'
  });
});

app.use((err, req, res, next) => {
  return res.render('error', { 
    code: 500, 
    head: 'Server error', 
    message: JSON.stringify(err)
  });
});

if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

export default app;
