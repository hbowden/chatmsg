var express = require('express');
var Deepstream = require('deepstream.io');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var user = require('./routes/user');
var mongoose = require('mongoose');
var passport = require('./strategies/userStrategy');
var session = require('express-session');
var MongoDBStorageConnector = require('deepstream.io-storage-mongodb');

var connectionString = 'mongodb://localhost/heroes';
mongoose.connect(connectionString);

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

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

app.post('/',
    passport.authenticate('local', {
        // request stays within node/express and is routed as a new request
        successRedirect: '/user',   // goes to routes/user.js
        failureRedirect: '/'        // goes to get '/' route below
    })
);

/* Try to get our port from the enviroment variable PORT, if the
   enviroment variable PORT is not set, default to 5000.  */
app.set('port', process.env.PORT || 5000);

/* Setup deepstream.io server. We use deepstream to sync message history
   across clients for messaging services that don't allow us to do this. */
var deepstream = new Deepstream();
deepstream.set('httpServer', server );
deepstream.set('storage', new MongoDBStorageConnector( {
  connectionString: connectionString,
  splitChar: '/'
}))

deepstream.start();

/* Use server listen instead app listen so we can use deepstream. */
server.listen(app.get('port'));
