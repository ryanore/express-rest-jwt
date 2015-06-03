
console.log("YOU NEED TO UPDATE PRODUCTION CONFIG");

module.exports = {
  version: '0.0.1',
  server : {port: process.env.PORT ||  8080, host: ''},
  env: 'production',
  email: {},
  db : process.env.MONGO_URI || 'mongodb://localhost:27017/testing_dev',
  whitelist: '*',
  auth: {
    disable: false,
    secret: 'salsdfk289e39qi12i12wp12kjw0',
    expiry_minutes: (60 * 3),
    expire_seconds: (60 * 60 * 3)
  }
};
