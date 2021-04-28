const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

//Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey:"2FakTHhdLNaJS23cPcQrtkLwG",
    consumerSecret: "gUc76nNfOfcaUj7HwlP6oZy442EB3t4oa3nlWYUPufsmP8fnXl",
    callbackURL: "http://localhost:4001/"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));