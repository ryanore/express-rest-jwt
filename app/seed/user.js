var User = require('../models/userModel').model;

module.exports = function(){
  User.findOne(function(usr){
    if( !usr){
      var admin = new User({
        'username':'firstAdmin',
        'firstName':'Admin',
        'lastName':'Admin',
        'email':'admin@example.com',
        'role':'admin',
        'password': 'iamanadmin'
      });
      admin.save();
    }
  });
}