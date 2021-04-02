const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var User = require('./modules/Users.js');

var buildUser = require('./modules/buildUser.js');

var unpackUser = require('./modules/unpackUser.js');

var updateUser = require('./modules/updateUser.js');

var getUser = require('./modules/getUser.js');

app.use(express.static('public' ));

app.use('/seedDB', function(req, res) {
  let data = [{username: 'Matt', tweet: 'urbanplaytime', insta: 'urbanplaytime', fb: 'matt.harvey.90204', lnk: 'mattharveycbusa', yt: 'UC1VODH3cOHufrRkm7i_oHQA'},
          {username: 'Cher', tweet: 'cher', insta: 'cher', fb: 'cher', lnk: '', yt: 'UCmoUgBTHRydApyOeqlDF1oQ'},
          {username: 'Bono', tweet: 'U2', insta: 'u2bonoloveofficial', fb: 'Bono.IND', lnk: '', yt: 'UCJj0xFFzvMHdxAVblCG_gpQ'}];

  for(var i = 0; i < data.length; i++) {
    var seedUser = new User ({
      username: data[i].username,
      tweet: data[i].tweet,
      insta: data[i].insta,
      fb: data[i].fb,
      lnk: data[i].lnk,
      yt: data[i].yt
    });;
    seedUser.save();
    res.write('Added!');
  }
  res.end();
});

app.use('/showAll', function(req, res) {

    User.find( function(err, foundUsers) {
		 if (err) {
		     res.status(500).send(err);
		 } else {
			 for(var i = 0; i < foundUsers.length; i++) {
         let message = "<p>Username: " + foundUsers[i].username;
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

app.post('/addUser', function(req, res) {

  var newUser = buildUser(req);

	newUser.save( function(err, user) {
		if (err) {
		  res.status(500).send(err);
		} else {
		  res.render("foundTweep", unpackUser("Tweep added!", "You've been added to the database!", user, "Welcome to the fun!"));
		}
   });
 });

app.get('/findUser', function(req, res) {
  res.render('findUser', {page_title: "Find your favorite Tweetars on other sites!"});
});

app.post('/findForm', function(req, res) {

	var search = getUser(req);

  User.findOne( {tweet: search}, function(err, foundTweep) {
		if (err) {
		  res.status(500).send(err);
		}
		else if (!foundTweep) {
		  res.send('No Tweetar with the handle of ' + search);
		}
		else {
      res.render('foundTweep', unpackUser("You found your tweep!", "We've found your tweep!", foundTweep, "Check out their other socials!"));
		}
	});
});

app.get('/updateUser', function(req, res) {
  res.render('updateUser', {page_title: "Update your account information"});
});

app.post('/updateForm', function(req, res) {
  updateUser(req, res);
});

app.get('/deleteyouraccount', function(req, res) {
  res.render('deleteAcct', {page_title: "Delete your account"});
});

app.post('/deleteForm', function(req, res) {

  let deleteID = getUser(req);

  User.findOneAndRemove({tweet: deleteID}, function(err, user) {
   if (err) {
     res.status(500).send(err);
   } else if (!user) {
     res.send('No user with the ID of ' + deleteID);
   } else {
     res.render('deleteConfirm', {page_title: 'Tweep deleted', tweet: deleteID})
  };
});
});

app.use((req, res) => {
    res.status(404).send("Sorry, no such page!")
});

app.listen(3000, () => {
    console.log('Listening on port 3000, ctrl-c to quit');
});
