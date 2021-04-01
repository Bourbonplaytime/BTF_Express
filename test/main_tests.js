const express = require('express');
const app = express();
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('chai').request;
var User = require('../modules/Users.js');

chai.use(chaiHttp);

describe('Mocha', function () {
  it('should run our tests using npm', function () {
    expect(true).to.be.ok;
  });
});

describe('buildUser', function() {
  var buildUser = require('../modules/buildUser.js');
  it('should create and return an object', function () {

    req = { body: {
      username: 'Matt',
      tweet: 'coachbourbonusa',
      insta: 'urbanplaytime',
      fb: 'matt.harvey.902604',
      lnk: 'mattharveycbusa',
      yt: 'dasgklhsadgkhl'
    }};

    expect(typeof(buildUser(req))).to.equal('object');
  });

  it('should return a username that matches the request', function () {
    expect(buildUser(req).username).to.equal(req.body.username);
  });

  it('should return a twitter that matches the request', function () {
    expect(buildUser(req).tweet).to.equal(req.body.tweet);
  });
});

describe('unpackUser', function() {
  var unpackUser = require('../modules/unpackUser.js');
  it('should return an object', function() {
    let userData = {username: 'Matt', tweet: 'coachbourbonusa', insta: 'urbanplaytime', fb: 'matt.harvey.902604', lnk: 'mattharveycbusa', yt: 'dagkdhasgkhga'};

    expect(typeof(unpackUser("Tweep added!", "You've been added to the database!", userData, "Welcome to the fun!"))).to.equal('object');
  });

  it('should have a matching twitter handle to the input', function() {
    let userData = {username: 'Matt', tweet: 'coachbourbonusa', insta: 'urbanplaytime', fb: 'matt.harvey.902604', lnk: 'mattharveycbusa', yt: 'dagkdhasgkhga'};

    expect(unpackUser("Tweep added!", "You've been added to the database!", userData, "Welcome to the fun!").tweet).to.equal(userData.tweet);
  });
});

describe('getUser', function() {
  var getUser = require('../modules/getUser.js');
  it('should return the twitter handle of requested user', function() {
  req = { body: { tweet: 'Coachbourbonusa'}};

  expect(getUser(req)).to.equal('Coachbourbonusa');
  });
});

describe('statusCodes(/findUser))', function() {
  it('should return status(200) and err should be null', function() {
    chai.request('http://localhost:3000')
      .get('/findUser')
      .send({page_title: "Find your favorite Tweetars on other sites!"})
      .end(function (err, res) {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
    });
  });
});

describe('moreStatusCodes(/updateUser))', function() {
  it('should return status(200) and err should be null', function() {
    chai.request('http://localhost:3000')
      .get('/updateUser')
      .send({page_title: "Find your favorite Tweetars on other sites!"})
      .end(function (err, res) {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
    });
  });
});
