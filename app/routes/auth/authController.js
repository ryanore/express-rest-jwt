var config = require ('../../../config/auth');
var User = require('../../models/userModel');
var jwt = require('jsonwebtoken');



/**
 *  Private: Generate JWT token
 *  Create Signed Token
 *  Store Token in Mongodb with self-destruct expire
 */
var generateAndSendToken = function(usr, req, res){
  var user = {
    username: usr.username,
    role: usr.role,
    _id: usr._id
  };

  var token = jwt.sign(user, config.secret, { expiresInMinutes: config.expiry_minutes });

  // do async db operation to verify token here
  
  return res.status(200).send(token);
};




module.exports = {
  /**
   *  Log In
   *  @param {String} req.body.username
   *  @param {String} req.body.password
   */
  login: function(req, res){
    User.findOne({username: req.body.username}, function(err,usr){
      if( err || !usr ){
          return res.status(401).send(err);
      }

      usr.comparePassword(req.body.password, function(err, isMatch) {
        if (err){ 
          throw err;
        }
        if(!isMatch){
          return res.status(401).send(err);
        }
        generateAndSendToken(usr, req, res);
      });
    });
  },  


  /**
   *  Verify Token, 
   *  Split Bearer Token and verify content of the header
   *  Verify user is in db
   *  Pass basic user info along
   */
  verifyToken: function(req, res){
    var token = null;
    var parts = req.headers.authorization.split(' ');

    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];
      
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        jwt.verify(token, config.secret, function(err, decoded){
          if(err){
            return res.status(401).send(err);
          } 
          else{
            User.findOne({username: decoded.username}, function(err,usr){
              generateAndSendToken(decoded, req, res);
            });
          }
        });
      } 
    } 
    else{
      console.log("No Valid authorization header...(Bearer) while verifying access_token");
      return res.status(401).send(err);
    }
  }

};
