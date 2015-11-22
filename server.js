//server.js
var express       = require('express'),
    app           = express(),
    ejs           = require('ejs'),
    ejsLayouts    = require('express-ejs-layouts'),
    mongoose      = require('mongoose'),
    flash         = require('connect-flash'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    passport      = require('passport'),
    passportConfig= require('./config/passport.js'),
    port          = process.env.PORT || 3000
    userRoutes    = require('./routes/user_route.js'),

/////////////////////
//mongoose connection
mongoose.connect('mongodb://localhost/passport-authentication', function(err){
  if(err) return console.log('Cannot connect :(')
  console.log('Connected to MongoDB. Sweet!')
})



//////////////
//middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

///////////////////
//ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

/////////////////////
//session + passport
app.use(session({
  secret: "boomchakalaka",
  cookie:{_expires : 60000000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

/////////////
//root route
app.use('/', userRoutes)


app.listen(port, function(){
  console.log('server running on port', port)
})
