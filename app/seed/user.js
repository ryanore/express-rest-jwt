var User = require('../models/userModel');
module.exports = function(){
  var user = User.findOne();
  console.log('SEED USER');
  console.log(user);
  console.log('DONE')
}