var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var Services = require('../models/service');
var Client = require('node-xmpp-client')

router.post('/:id', function(req, res) {
  if(req.isAuthenticated()) {
    var id = req.params.id;
    var xmpp = req.body;
    /* Look up the user's user object so we can modify it. */
    Users.findById(id).populate('service').exec(function(err, user) {
      if(err) {
        console.log("Can't find user", err);
        res.sendStatus(500);
        return;
      }

      var client = new Client({
          jid: xmpp.jid,
          password: xmpp.password
      })

      client.on('online', function() {
          console.log('online')
          /* Create new service. */
          var service = new Services({name: 'xmpp', jid: xmpp.jid, password: xmpp.password});
          user.services.push(service);

          /* Save the new service and user object. */
          service.save();
          user.save();

          res.send(user.services);
      });

      client.on('stanza', function(stanza) {
          console.log('Incoming stanza: ', stanza.toString())
      });

    });
  } else {
    console.log('not logged in');
    res.sendStatus(403);
  }
});

module.exports = router;
