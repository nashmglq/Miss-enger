const passport = require("passport"); // library for managing user authentication, such as session
const GoogleStrategy = require("passport-google-oauth20").Strategy; // this is for the registration and login using google

passport.use( // use passport library
  new GoogleStrategy( // this part set up the google
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) { // this is for like an authentication check for jwt to get the values needed
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      return done(null, user); // returns the user (object), the reutnr means done(no error, object of user)
    }
  )
);

// passport.serializeUser is used for session-based authentication, 
// where user data is stored on the server, while JWT stores authentication data in the client (like localStorage or cookies) 
// for stateless authentication.
passport.serializeUser(function (user, done) {
  done(null, user.id);1
});


// passport.deserializeUser retrieves the user's ID from the session to compare  such as  URL parameters and check if the user can access certain pages or actions. 
passport.deserializeUser(function (id, done) {
  done(null, { id }); 
});

module.exports = passport;
