//app.js
var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  Router = require('./routes/route.js'),
  userRouter = require('./routes/users.js'),
  port = process.env.PORT || 3000,
  passportConfig = require('./config/passport.js')



//makes json object available in requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



mongoose.connect('mongodb://teamtucker:password123@ds053964.mongolab.com:53964/dansdb', function(err){
	if(err) return console.log('Cannot connect ')
	console.log('Connected to MongoDB. Sweet!')
})



// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use(express.static(__dirname + "/public"))


app.use('/api', Router)

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)


// session middleware
app.use(session({
	secret: 'boomchakalaka',
	cookie: {_expires: 6000000},
  resave: true,
  saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//root route
app.get('/', function(req,res){
	res.render('index')
})

//users route
app.use('/', userRouter)




app.listen(port, function(){
  console.log('server running on port', port)
})
