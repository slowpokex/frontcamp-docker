import 'babel-polyfill';
import 'babel-register';

import mongoose, { Error } from 'mongoose';
import util from 'util';
import notifier from 'node-notifier';
import app from './config/express';
import config from './config/env';

const debug = require('debug')('frontcamp');

const notify = (message) => {
  notifier.notify({
    title: 'Frontcamp',
    message,
    sound: true,
    wait: true,
  });
};


mongoose.connect(config.db.uri);
mongoose.connection.on('error', () => {
  const message = `Unable to connect to MongoDB: ${config.db.uri}`;
  notify(message);
  throw new Error(message);
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
  const message = `Frontcamp server started on the ${config.port} port (${config.env})`;
  debug(message);
  notify(message);
});

export default app;
