var mongoose = require('mongoose'),
  Schema = mongoose.Schema


//creating schema of our meetup records
var videoSchema = new Schema({
  videoId: String,
  source: String,
  categoryName: String
})

//middleware before saving to the db
videoSchema.pre('save',function(next){
  if(!this.created_at){
    var currentDate = new Date()
    this.created_at = currentDate
  }
  next()
})

// build a model from the schema
var Video = mongoose.model('Video', videoSchema)

//make the model object available to rest of application
module.exports = Video

