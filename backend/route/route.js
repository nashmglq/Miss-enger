const express = require("express")
const route = express.Router()
const passport = require('../middleware/passport');
const { getInitial, handelGoogleCallback } = require("../controller/authentication");


route.get("/index", getInitial)

// Initiate Google OAuth
// the two paremeters let us set what to use (services) such as google and the scope let us what to access or get 
// such as the profile and email of the user
route.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback handler
// if success use the handelGoogleCallback actions if not redirect to home
route.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), handelGoogleCallback);



// happy new year, developing logging in
// install scoketio

module.exports = route