var passport = require('../config/passport.js')
var User     = require('../models/User.js')


function index(req,res){
    User.find({}, function(err,data){
        if(err) res.json({ err: err })
        res.json(data)
    })
}

function update(req, res){
  User.findById(req.params._id, function(err,user){
    console.log(user)
    user.local.name = req.body.local.name
    user.local.email = req.body.local.email
    user.local.zip = req.body.local.zip
    user.local.password = req.body.local.password
  //  {name: req.user.name}, {email: req.user.email}, {zip: req.user.zip}, {password: req.user.email}, function(err, user){
    user.save(function(err){
      if(err) res.send(err)
      res.json(user)
    })
  })
}

function userData(req,res){
  User.find({_id: req.user._id},function(err,user){
    if(err) res.json({err: err})
      console.log("userData", req.user)
    res.json(req.user)
  })
}

function show(req, res){
     User.find({_id: req.user._id}, function(err,user){
         if(err) res.json({ err: err })
         console.log("the user is ", req.user)

         res.render('profile', {user: req.user})
     })
 }

function destroy(req, res){
  console.log(req.user._id)
    User.findOneAndRemove({_id: req.user._id}, function(err, user){
        if(err) res.send(err)
        res.json(user)
    })
}


module.exports = {
    index: index,
    show: show,
    update: update,
    destroy: destroy,
    userData: userData
}
