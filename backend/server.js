const dotenv = require('dotenv').config(); // take effect to all
const express = require("express");
const app = express()
const route = require("./route/route")
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true for HTTPS
    })
  );
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use("/", route)

app.listen(5000, () => {console.log("Running")})