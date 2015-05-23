var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    bcrypt    = require('bcrypt');
var SALTS     = 10;
var uniqueValidator = require('mongoose-unique-validator');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

var UserSchema   = new Schema({
  firstName: String,
  lastName: String,
  superAdmin: { 
    type: Boolean, 
    default: false
  },
  email: { 
    validate:[validateEmail, 'not valid'], 
    type: String, 
    required: true, 
    trim: true
  },
  username: { 
    type: String, 
    required: true, 
    min: 5, 
    max: 20, 
    unique:true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true, 
    min: 5, 
    max: 20, 
    trim: true 
  },
  role: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});


/**
 *  STATIC FUNCTIONS
 *  
 */
UserSchema.statics = {
  /**
   *  Find User By username
   *  @param {String}
   *  @param {Function}
   */
  findByUsername: function(name, cb) {  
    this.findOne({
      username: name
    }).exec(cb)
  }
};



UserSchema.methods = {
  /**
   *  Compare password for authentication
   *  @param {String} candidatePassword The password to compare with the Model instance
   *  @param {Function} cb callback function
   */
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  }
};


/**
 *  Pre-save Hook
 *  Called anytime a save method is called on the mondoDb document
 *  This isn't called for mongoose class methods
 *  @description If the Password has been changed, Salt/hash it before saving
 */
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALTS, function(err, salt) {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.plugin(uniqueValidator, { message: 'unique' });


// Export the schema and the model in case we need to reference separately
module.exports = {
  schema: UserSchema,
  model: mongoose.model('User', UserSchema)
};
