// Step 2 //
var express = require('express'),
    passport = require('passport'),
    userRouter = express.Router(),
    usersController = require('../controllers/user_controller.js')

///////////// Step 5 /////////////
userRouter.route('/login')
  .get(function(req, res){
    res.render('login', { message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  userRouter.route('/index')
    .get(usersController.index)

userRouter.route('/update/:_id')
  .get(function(req, res){
    res.render('update')
  })
  .put(usersController.update)


userRouter.route('/profile')
  .get(usersController.show)
  .delete(usersController.destroy)

userRouter.route('/signup')
  .get(function(req, res){
    res.render('signup', { message: req.flash('signupMessage') })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))
  ////////// End Step 5 ///////////

//generate users profile page when logged in
userRouter.get('/profile', isLoggedIn, function(req, res){
  res.render('profile', {user: req.user})
})
userRouter.get('/profile/update', isLoggedIn, function(req, res){
  res.render('edit', {user: req.user})
})
userRouter.put('/profile/udpate',function(req, res){
  res.render('profile', {user: req.user})
})

userRouter.route('/profile')
  .delete(usersController.destroy)

userRouter.route('/user')
  .get(usersController.userData)

///////////// Step 9 /////////////
userRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

userRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}))
////////// End Step 9 ///////////
userRouter.get('/auth/meetup', passport.authenticate('meetup'))

userRouter.get('/auth/meetup/callback', passport.authenticate('meetup', {
  successRedirect: '/',
  failureRedirect: '/'
}))

///////////// Step 6 /////////////
userRouter.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})
////////// End Step 6 ///////////

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter

// End Step 2 //
