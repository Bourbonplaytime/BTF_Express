var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/btf_new', {useNewUrlParser: true, useUnifiedTopology: true});

var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	tweet: { type: String, required: true, unique: true, index: true},
  insta: {type:String},
  fb: {type: String},
  lnk: {type: String},
  yt: {type: String}
});

module.exports = mongoose.model('User', userSchema);
