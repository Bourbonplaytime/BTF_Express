var User = require('./Users.js');
var unpackUser = require('./unpackUser.js');
var getUser = require('./getUser.js');

module.exports = function(req, res) {

  let updateID = getUser(req);
  let updateIG = req.body.ig;
	let updateFB = req.body.fb;
  let updateLNK = req.body.lnk;
  let updateYT = req.body.yt;

  User.findOne( {tweet: updateID}, function(err, user) {
	if (err) {
	    res.status(500).send(err);
	}
	else if (!user) {
	    res.send('No user with the twitter handle ' + updateID);
	}
	else {
		user.insta = updateIG;
		user.fb = updateFB;
    user.lnk = updateLNK;
    user.yt = updateYT;

    user.save(function (err, user) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.render('foundTweep', unpackUser("Info updated!", "Your profiles have been updated!", user, "Thanks for keeping us up to speed!"));
      };
    });
    };
  });
};
