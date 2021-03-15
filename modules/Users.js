var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/btf_profile');

var userSchema = new mongoose.Schema({
	userID: {type: Number, index: true, required: true, unique: true},
	username: {type: String, index: true, required: true, unique: true},
	tweet: { type: String, required: true },
  insta: {type:String},
  fb: {type: String},
  lnk: {type: String},
  yt: {type: String}
});

module.exports = mongoose.model('User', userSchema);
