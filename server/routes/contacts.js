var express = require('express');
var router = express.Router();
var Contacts = require('../models/contacts');
var Users = require('../models/user');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Users.findById(id).populate('contacts').exec(function(err, user) {
    if(err) {
      console.log("Can't find user", err);
      res.sendStatus(500);
      return;
    }

    res.send(user.contacts);
  });
});

router.post('/:id', function(req, res) {
  var data = req.body;
  var id = req.params.id;
  Users.findById(id).populate('contacts').exec(function(err, user) {
    if(err) {
      console.log("Can't find user", err);
      res.sendStatus(500);
      return;
    }

    var contact = new Contacts({
      username: data.name,
      jid: data.jid,
      service: data.service
    });
    contact.save();
    user.contacts.push(contact);
    user.save();

    res.sendStatus(201);
  });
});

module.exports = router;
