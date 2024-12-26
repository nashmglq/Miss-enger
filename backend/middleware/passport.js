const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      // Store user information in session
      return done(null, user);
    }
  )
);

// Serialize the user into the session
passport.serializeUser(function (user, done) {
  done(null, user.id); // Store only the user's ID in the session
});

// Deserialize the user from the session
passport.deserializeUser(function (id, done) {
  done(null, { id }); // Retrieve the user from the session
});

module.exports = passport;
