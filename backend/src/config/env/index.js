if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const defaults = {
  secret: process.env.SECRET || 'frontcamp',
  securityMode: !!process.env.SECURITY_MODE,
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
