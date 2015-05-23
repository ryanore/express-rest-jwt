var express   = require('express'),
    config    = require('../config'),
    path      = require('path'),
    logger    = require('morgan'),
    bodyParser= require('body-parser'),
    socket    = require('./socket'),
    mongoose  = require('mongoose');
var app       = express();

/**
 *  Initialize Application 
 *  Once MongoDB has connected, this is called.
 *  Set middleware, Listen for server, init websocket
 */
var initApplication = function initApplication(){

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  app.all('/*', [require('./middleware/cors')]);

  var routes    = require('./routes')(app);

  app.set('port', config.server.port);

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
    // socket is a singleton basically,  just comment this out if
    socket.init(server);
  });

};


/* MONGODB */
var initDB = function initDB(){
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    require('./seed/user');
    initApplication();
  });
}();

module.exports = app;
