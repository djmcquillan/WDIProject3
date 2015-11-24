// user_route.js
var express       = require('express')
var passport      = require('passport')
var userRouter    = express.Router()

userRouter.route('/login')
  .get(function(req, res){
    res.render('login', {message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }))

userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', {message: req.flash('signupMessage')})
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'

  }))

userRouter.get('/profile', isLoggedIn, function(req, res){
  //render the user's profile (only if they are currently logged in)
  res.render('profile', {user: req.user})
})

//facebook routes

userRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

userRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
}))

userRouter.get('/logout', function(req, res){
  //destroy the session, and redirect the user back to the home page
  req.logout()
  req.redirect('/')
})

//a method used to authorize a user BEFORE allowing them to proceed to the profile page:
function isLoggedIn (req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
