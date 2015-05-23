var config = require('../../config');
var expressJwt = require('express-jwt');

module.exports = function(req,res,next){
  next();
  // expressJwt({ secret: config.auth.secret}).apply(this,arguments);
};
