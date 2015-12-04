var express         = require('express'),
    Router      = express.Router(),
    videoController  = require('../controllers/video_controller.js')
   


// create routes for /api
Router.route('/videos')
  .get(videoController.index)



// Router.route('/meetups')
// 	.get(meetupController.show)


  module.exports = Router
  // module.exports = meetupRouter

