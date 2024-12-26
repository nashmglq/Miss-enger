const express = require("express");
const passport = require("passport");
const pool = require("../config/connect")

const getInitial = (req, res) => {
  try {
    return res.status(200).json({ success: "Hello world!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const handelGoogleCallback = async(req, res) => {
  const user = req.user;
  const {id, name, email} = user  
  try {

    if(!user) return res.status(400).json({success: "No email received"})
    
    const [result] = await pool.query(`SELECT email FROM users WHERE email = ?`, [user.email])

    if(result.length > 0) return res.status(100).json({success: "Account already exist."})

    const register = await pool.query(`INSERT INTO users (googleId, name, email) VALUES (?, ?, ?)`, [id, name, email])

    res.status(200).json({ success: register });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getInitial, handelGoogleCallback };
