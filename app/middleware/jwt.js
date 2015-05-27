var config = require('../config');
var expressJwt = require('express-jwt');

module.exports = function(req,res,next){
  // next(); // to debug without jwt uncomment
  expressJwt({ secret: config.auth.secret}).apply(this,arguments);
};
