var User = require('./Users.js');
var getUser = require('./getUser.js');

module.exports = function(req) {
  let newUser = new User ({
    username: req.body.username,
    tweet: getUser(req),
    insta: req.body.insta,
    fb: req.body.fb,
    lnk: req.body.lnk,
    yt: req.body.yt
  });

  return newUser;
}
