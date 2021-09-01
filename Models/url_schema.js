var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  longurl :String,
  shorturl:String,
  shortid :String,
  date: {
    type: String,
    default: Date.now
}
  

});

var url_model = mongoose.model('url',urlSchema);

module.exports = url_model;