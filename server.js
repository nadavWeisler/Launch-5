console.log("Start server.js");

//Required third party modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieSessoin = require('cookie-session');
const passport = require('passport');
const _ = require('lodash');
const socketIO = require('socket.io');
const http = require('http');

//Consts
const keys = require('./config/keys');

//Connect to mongoDB
const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
console.log(keys.MONGODB_URI);
mongoose.connect(keys.MONGODB_URI);

//Initilize new express server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//Use cookies
app.use(
  cookieSessoin({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey] 
  })
);

//Initilize passport
app.use(passport.initialize());
app.use(passport.session());

//Use JSON in app
app.use(bodyParser.json());

//Electorize modules
require('./models/encouragement');

//Google OAuth
require('./models/user');
require('./services/passport');
require('./routes/authRoutes')(app);

//Define port
const port = process.env.PORT || keys.PORT;

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

//Listen to port
server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
