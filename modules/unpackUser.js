module.exports = function(pageTitle, pageMessage, user, pageEndMessage) {
  let title = pageTitle;
  let message = pageMessage;
  let name = user.username;
  let tweet = user.tweet;
  let insta = user.insta;
  let fb = user.fb;
  let lnk = user.lnk;
  let yt = user.yt;
  let endMessage = pageEndMessage;

  let userData = {page_title: title, message: message, name: name, tweet: tweet, insta: insta, fb: fb, lnk: lnk, yt: yt, endMessage: pageEndMessage};

  return userData;
}
