// https://www.passportjs.org/packages/passport-yahoo-oauth/
// npm install passport-yahoo-oauth

// DESC: Configure Strategy

/* passport.use(new YahooStrategy({
  consumerKey: YAHOO_CONSUMER_KEY,
  consumerSecret: YAHOO_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/yahoo/callback"
},
function(token, tokenSecret, profile, done) {
  User.findOrCreate({ yahooId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
)); */

// DESC: Authenticate Requests
/* app.get('/auth/yahoo',
  passport.authenticate('yahoo'));

app.get('/auth/yahoo/callback',
  passport.authenticate('yahoo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }); */

// NOTE: Tests
// npm install --dev
// make test
