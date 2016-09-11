var express = require('express');
var Deepstream = require('deepstream.io');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var user = require('./routes/user');
// var mongoose = require('mongoose');
// mongoose.connect(process.env.DBSTRING || 'mongodb://localhost/heroes');

/* Explicitly create a HTTP server from our express app. */
var server = http.createServer(app);

/* Serve back static files */
app.use(express.static(path.join(__dirname, './public')));

/* Middleware. */
app.use(bodyParser.json());
app.use('/user', user);

/* Handle index file separately */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
})

/* Try to get our port from the enviroment variable PORT, if the
   enviroment variable PORT is not set, default to 5000.  */
app.set('port', process.env.PORT || 5000);

/* Setup deepstream.io server. We use deepstream to sync message history
   across clients for messaging services that don't allow us to do this. */
var deepstream = new Deepstream();
deepstream.set('httpServer', server );
deepstream.start();

/* Use server listen instead app listen so we can use deepstream. */
server.listen(app.get('port'));
