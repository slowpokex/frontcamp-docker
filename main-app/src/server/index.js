import 'babel-polyfill';
import 'babel-register';

import mongoose, { Error } from 'mongoose';
import util from 'util';
import app from './config/express';
import config from './config/env';

const debug = require('debug')('frontcamp');

mongoose.connect(config.db.uri);
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to MongoDB: ${config.db.uri}`);
});

if (config.db.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// Init security
if (config.securityMode) {
  require('./config/passport');
}

app.listen(config.port, () => {
  debug(`server started on the ${config.port} port (${config.env})`);
});

export default app;
