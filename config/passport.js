var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  MeetupStrategy   = require('passport-meetup').Strategy,
  configAuth = require('./auth.js')
  

var User = require('../models/User.js')

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

// Strategy for sign up
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    if(user) return done(null, false, req.flash('signupMessage', 'That email is already taken.'))

    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.city = req.body.city
    newUser.local.state = req.body.state
    newUser.local.email = req.body.email
    newUser.local.password = newUser.generateHash(password)

    newUser.save(function(err){
      if(err) throw err
      return done(null, newUser, null)
    })
  })
}))

// Strategy for login
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err, user){
    if(err) throw err
    if(!user) return done(null, false, req.flash('loginMessage', 'No user found.'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Invalid email/password'))
    return done(null, user)
  })
}))

/////meetup strategy//////////
passport.use(new MeetupStrategy({
    consumerKey: configAuth.meetupAuth.client_id,
    consumerSecret: configAuth.meetupAuth.client_secret,
    callbackURL: configAuth.meetupAuth.redirect_uri
    // grantType: configAuth.meetupAuth.grant_type,
    // code: configAuth.meetupAuth.code,
  }, function (token, refreshToken, profile, done) {
    // console.log(profile)
    var data = profile._raw
    var rawData = JSON.parse(data)
    console.log(rawData)
    User.findOne({'meetup.id': profile.id}, function(err, user){
    if(err) return done(err)
    if(user) {
      return done(null, user)
    }
    else {
      var newUser = new User()
      newUser.meetup.id = profile.id
      newUser.meetup.token = token
      newUser.meetup.name = profile.displayName
      newUser.meetup.city = rawData.results[0].city
      newUser.meetup.state = rawData.results[0].state
      console.log("city:",rawData.results[0].state)
     
      newUser.save(function(err){
        if(err) throw err
        return done(null, newUser)
     })
    }
  })
}))

module.exports = passport


