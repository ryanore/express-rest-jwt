var User = require('../../models/userModel').model;
var BaseController = require('../../base/baseController');
var nodeUtil = require('util');
/**
 *  Users Controller 
 *  @extends {BaseController}
 */
var UsersController = function(model, name){
  BaseController.apply(this, arguments);
};

nodeUtil.inherits(UsersController, BaseController);

module.exports = new UsersController(User, "UsersController");
