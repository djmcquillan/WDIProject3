//user_model.js
var mongoose      = require('mongoose')
var bcrypt        = require('bcrypt')
    Schema        = mongoose.Schema

var userSchema    = new Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  facebook: {
    id: String,
    name: String,
    token: String,

  }
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
