if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const defaults = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  db: {
    uri: process.env.MONGODB_URI,
    debug: false
  }
}

let config = {};

try {
  config = require(`./${defaults.env}`);
  config = config || {};
} catch (err) {
  config = {};
}

export default Object.assign(defaults, config);
