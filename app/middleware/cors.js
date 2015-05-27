var config = require('../config');

module.exports = function(req, res, next) {
  var origin = req.header('Origin');
  
  if(config.whitelist.indexOf(req.header('Origin')) === -1 && 
    !config.debug &&
    config.whitelist[0] !== '*'){
    return  next();
  }

  res.set({
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-type,Accept,X-Access-Token,X-Key',
    'Access-Control-Allow-Origin': origin
  });

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};