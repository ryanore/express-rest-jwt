var confs = {
  production: require('./production'),
  testing: require('./testing'),
  development: require('./development')
}

var env = process.env.NODE_ENV || 'production';
module.exports = confs[env];
