console.log("Start server.js");

//Required third party modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieSessoin = require('cookie-session');
const passport = require('passport');
const http = require('http');

//Consts
const keys = require('./config/keys');

//Connect to mongoDB
const mongoose = require('mongoose');
mongoose.connect(keys.MONGODB_URI);

//Initilize new express server
let app = express();
let server = http.createServer(app);

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

require('./routes/launchRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/authRoutes')(app);

//launch modules
require('./models/launch');
require('./models/user');

//Google OAuth
require('./services/passport');

const {Launch} = require('./models/launch');

var twoDaysOld = new Date();
twoDaysOld.setMinutes(twoDaysOld.getDay-2);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname,'client', 'build', 'index.html'));
  })
}

//Define port
const port = process.env.PORT || keys.PORT;

//Listen to port
server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
