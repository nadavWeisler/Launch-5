const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("Users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
     },
    async (accessToken, refreshToken, profile, done) => {
      //Find if user exist
      const existingUser = await User.findOne({googleAuthId: profile.id});   
      if (existingUser) {
        done(null, existingUser);
        } 
      else {
        //Create new user
        var newUser = await new User({googleAuthId: profile.id}).save();
        done(null, user);
        }
    })
  );