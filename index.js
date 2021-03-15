const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var User = require('./modules/Users.js');

app.use(express.static('public' ));

app.use('/showAll', function(req, res) {

    User.find( function(err, foundUsers) {
		 if (err) {
		     res.status(500).send(err);
		 } else {
			 for(var i = 0; i < foundUsers.length; i++) {
         let message = "<p>Username: " + foundUsers[i].username + " UserID: " + foundUsers[i].userID;
         message += '<br /><hr> can be found on Twitter at <a href="https://twitter.com/' + foundUsers[i].tweet + '">' + foundUsers[i].tweet + '</a>';
         message += "<br /><hr> IG: <a href='https://www.instagram.com/" + foundUsers[i].insta + "'>" + foundUsers[i].insta + "</a><br /><hr>";
         message += "Facebook: <a href='https://www.facebook.com/" + foundUsers[i].fb + "'>" + foundUsers[i].fb + "</a><br /><hr>";
         message += "LinkedIn: <a href='https://www.linkedin.com/in/" + foundUsers[i].lnk + "'>" + foundUsers[i].lnk + "</a><br /><hr>";
         message += "Youtube: <a href='https://www.youtube.com/channel/" + foundUsers[i].yt + "'>" + foundUsers[i].yt + "</a><br /><hr></p>";
         res.write(message);
			 }
			 res.end();
		 }
    });
});

app.get('/', (req, res) => {
    res.render('welcome', {page_title: "Welcome to my App!"});
  });

app.post('/addUser', function(req, res){

	var newUser = new User ({
    userID: req.body.userID,
    username: req.body.username,
    tweet: req.body.tweet,
    insta: req.body.insta,
    fb: req.body.fb,
    lnk: req.body.lnk,
    yt: req.body.yt
	});

	newUser.save( function(err, user) {
		if (err) {
		    res.status(500).send(err);
		}
		else {

      let name = user.username;
      let tweet = user.tweet;
      let insta = user.insta;
      let fb = user.fb;
      let lnk = user.lnk;
      let yt = user.yt;

      let addedData = {page_title: "Tweep added!", message: "You've been added to the database!", name: name, tweet: tweet, insta: insta, fb: fb, lnk: lnk, yt: yt, endMessage: "Welcome to the fun!"};

		  res.render("foundTweep", addedData);
		}
   });
 });

app.get('/findUser', function(req, res) {
  res.render('findUser', {page_title: "Find your favorite Tweetars on other sites!"});
});

app.post('/findForm', function(req, res) {

	var search = req.body.tweet;
	User.findOne( {tweet: search}, function(err, foundTweep) {
		if (err) {
		    res.status(500).send(err);
		}
		else if (!foundTweep) {
		    res.send('No Tweetar with the handle of ' + search);
		}
		else {
      let name = foundTweep.username;
      let tweet = foundTweep.tweet;
      let insta = foundTweep.insta;
      let fb = foundTweep.fb;
      let lnk = foundTweep.lnk;
      let yt = foundTweep.yt

      let foundData = {page_title: "You found your tweep!", message: "We've found your tweep!", name: name, tweet: tweet, insta: insta, fb: fb, lnk: lnk, yt: yt, endMessage: "Check out their other socials!"}
      res.render('foundTweep', foundData);
		}
	});
});

app.get('/updateUser', function(req, res) {
  res.render('updateUser', {page_title: "Update your account information"});
});

app.post('/updateForm', function(req, res) {

  let updateID = req.body.tweet;
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

        let name = user.username;
        let tweet = user.tweet;
        let insta = user.insta;
        let fb = user.fb;
        let lnk = user.lnk;
        let yt = user.yt;

        let updatedData = {page_title: "Info updated!", message: "Your profiles have been updated!", name: name, tweet: tweet, insta: insta, fb: fb, lnk: lnk, yt: yt, endMessage: "Thanks for keeping us up to speed!"};

        res.render('foundTweep', updatedData);
      }
     });
   }
 });
});

app.get('/deleteyouraccount', function(req, res) {
  res.render('deleteAcct', {page_title: "Delete your account"});
});

app.post('/deleteForm', function(req, res) {

	 var deleteID = req.body.tweet;

	 User.findOneAndRemove({tweet: deleteID}, function(err, user) {
		if (err) {
		    res.status(500).send(err);
		}
		else if (!user) {
		    res.send('No user with the ID of ' + deleteID);
		}
		else {

      let tweet = deleteID;

      let deleteData = {page_title: "Tweep deleted!", tweet: tweet};
      res.render('deleteConfirm', deleteData);
		}
    });
});

app.use((req, res) => {
    res.status(404).send("Sorry, no such page!")
});

app.listen(3000, () => {
    console.log('Listening on port 3000, ctrl-c to quit');
});
