var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var Services = require('../models/service');
var Client = require('node-xmpp-client');

var clientMap = {};

router.get('/connect/:id', function(req, res) {
  var id = req.params.id;

  Users.findById(id).populate('service').exec(function(err, user) {
    if(err) {
      console.log("Can't find user", err);
      res.sendStatus(500);
      return;
    }

    console.log("User: ", user);

    Services.findById(user.services[0], function(err, service) {
      console.log("service: ", service);
      var client = new Client({
          jid: service.jid,
          password: service.password
      })

      client.on('online', function() {
        console.log('online')

        clientMap[service.jid] = client;

        res.send({jid: service.jid});
      });

      client.on('stanza', function(stanza) {
          console.log('Incoming stanza: ', stanza.toString())
      });
    });
  });
});

router.post('/send', function(req, res) {
  var message = req.body;
  if(req.isAuthenticated()) {
    /* Create message. */
    var stanza = new Client.Stanza('message', {to: message.toJid, type: 'chat'})
      .c('body').t(message.text);

    /* Look up our client object. */
    var client = clientMap[message.fromJid];

    console.log("from: ", message);

    /* Send XMPP message. */
    client.send(stanza);

    /* Let the client, ie the angular app know we succeded. */
    res.sendStatus(200);
  }
});

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

          clientMap[xmpp.jid] = client;

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
