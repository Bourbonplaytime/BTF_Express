var User = require('./Users.js');

module.exports = function(req) {
  let newUser = new User ({
    username: req.body.username,
    tweet: req.body.tweet,
    insta: req.body.insta,
    fb: req.body.fb,
    lnk: req.body.lnk,
    yt: req.body.yt
  });

  return newUser;
}
