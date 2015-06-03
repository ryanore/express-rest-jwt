var config = require('../config');
var expressJwt = require('express-jwt');

module.exports = function(req,res,next){
  if( config.auth.disable ) return next();
  console.log(config.auth);
  expressJwt({ secret: config.auth.secret}).apply(this,arguments);
};
