var config = require('../config');
var expressJwt = require('express-jwt');

module.exports = function(req,res,next){
  if( config.debug ) return next();
  expressJwt({ secret: config.auth.secret}).apply(this,arguments);
};
