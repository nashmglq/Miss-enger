const express = require("express")
const route = express.Router()
const passport = require('../middleware/passport');
const { getInitial, handelGoogleCallback } = require("../controller/authentication");


route.get("/index", getInitial)

// Initiate Google OAuth
route.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback handler
route.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), handelGoogleCallback);

// Add a protected route
route.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ success: "User is authenticated", user: req.user });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});


module.exports = route