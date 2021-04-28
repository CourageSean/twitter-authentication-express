const express = require("express")
const passport = require('passport')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const TwitterStrategy = require('passport-twitter').Strategy
const server = express()
const isLoggedIn = require('./middleware/auth')


server.use(cookieSession({
    name: 'twitter-auth-session',
    keys: ['alpha', 'beta']
  }))

//Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey:"2FakTHhdLNaJS23cPcQrtkLwG",
    consumerSecret: "gUc76nNfOfcaUj7HwlP6oZy442EB3t4oa3nlWYUPufsmP8fnXl",
    callbackURL: "http://localhost:4001/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//SerializingUser

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  server.use(passport.initialize());
  server.use(passport.session());

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4001

server.listen(PORT,() => {
    console.log("listening port 4001")
  })

  server.get("/",isLoggedIn,(req,res) => {
   
    res.render("pages/index")
  })

  server.get('/auth/twitter',passport.authenticate('twitter'));

  server.get('/auth/twitter/callback',passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/');
});