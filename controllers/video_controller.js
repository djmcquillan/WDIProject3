var Video  = require('../models/video.js'),
    request = require('request')

    

function index(req, res){
  var requestURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUAuUUnT6oDeKwE6v1NGQxug&maxResults=25&key=AIzaSyAzeF6VB_ogSwIfHIFYje4IAY0enmfRum0"
  request(requestURL,function(error,response,body){
    var videoItems = JSON.parse(body).items
    var randomVideo=Math.floor(Math.random() * videoItems.length)
    console.log("randomVideo #",randomVideo)
    var videoId = videoItems[randomVideo].snippet.resourceId.videoId
    var embedURL = 'https://www.youtube.com/embed/' + videoId
    console.log("embedURL:", embedURL)

    //second request to get video category based on video id
    var requestCategoryIdURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+ videoId +"&key=AIzaSyAzeF6VB_ogSwIfHIFYje4IAY0enmfRum0"
    request(requestCategoryIdURL,function(error,response,body){
      var videoCategoryItems = JSON.parse(body).items
      var categoryId = videoCategoryItems[0].snippet.categoryId
      console.log("categoryID:", categoryId)
          
      //third request to get category name based on category id
      var requestCategoryNameURL = "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id="+ categoryId + "&key=AIzaSyAzeF6VB_ogSwIfHIFYje4IAY0enmfRum0"
      request(requestCategoryNameURL,function(error,response,body){
        var categoryItems = JSON.parse(body).items
        console.log('category items', categoryItems)
        var categoryName = categoryItems[0].snippet.title
        console.log("categoryName:", categoryName) 
        var video = Video({
          videoId: videoId,
          source: embedURL,
          categoryName: categoryName
        })
        video.save(function(err){
          if (err) res.send(err)
          console.log("success")
        }) 
    res.json(video)
      })
    })
  })    
}

module.exports = {
  index: index
}
