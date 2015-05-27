var User = require('../../models/userModel').model;
var BaseController = require('../../base/baseController');
var nodeUtil = require('util');
var auth = require('../auth/authController');
/**
 *  Users Controller 
 *  @extends {BaseController}
 */
var UsersController = function(model, name){
  BaseController.apply(this, arguments);
};
nodeUtil.inherits(UsersController, BaseController);


UsersController.prototype.create = function(req, res) {
    var data = req.body || {};
    var instance = new this.model(data);
    // validate user...
    instance.save(function(err) {
      if( err ) return res.status(400).json(err);
      auth.generateAndSendToken(instance, req, res);
    });
},

module.exports = new UsersController(User, "UsersController");
