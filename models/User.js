// Step 1 //
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema

var userSchema = new Schema({
    local: {
      name: String,
      city:  String,
      state: String,
      email: String,
      password: String
    },
    facebook: {
      id: String,
      name: String,
      token: String,
      email: String
    },
    meetup: {
      id: String,
      name: String,
      token: String,
      city: String,
      state: String
      // email: String
  }
})

//create 2 custom methods for userSchema
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
  var user = this
  return bcrypt.compareSync(password, user.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
// End Step 1 //
