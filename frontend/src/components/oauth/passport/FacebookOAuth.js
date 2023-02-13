// https://www.passportjs.org/packages/passport-facebook/
// npm install passport-facebook

// DESC: Configure Strategy

/* passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/

// DESC: Authenticate Requests
/* app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });*/

// NOTE: How to ask user for additional permission
/* 
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));
*/

// NOTE: How to re-ask for declined permission
/* 
app.get('/auth/facebook',
  passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['user_friends', 'manage_pages'] }));
*/

// NOTE: How to obtain a user profile with specific fields

/* 
new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}), ...)
*/

// NOTE: Include app secret proof in API requests
/* 
new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  enableProof: true
}, ...)
*/
