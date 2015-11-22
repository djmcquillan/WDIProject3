//user_model.js
var mongoose      = require('mongoose'),
    bcrypt        = require('bcrypt'),
    Schema        = mongoose.Schema

var userSchema    = new Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  meetup: {
    id: String,
    name: String,
    token: String,
    email: String
  }
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(passowrd){
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
