var express = require('express');
var router = express.Router();
var Users = require('../models/user');

router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // res.sendFile(path.join(__dirname, '../public/views/index.html'));
    res.send(false);
  }
});

router.post('/', function(req, res) {
  var user = req.body;

  console.log("user: ", user);

  Users.create(user, function(err, post) {
    if(err) {
      console.log("Can't create user: ", err);
      return;
    } else {
      /* Redirect to passport */
      res.redirect('/');
    }
  });
});

module.exports = router;
