const jwt = require("jsonwebtoken");

const authenticationChecker = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    if (!token) return res.status(400).json({ error: "No token found." });

    const verifier = jwt.verify(token, process.env.JWT_SECRET)

    req.user = verifier;    

  } catch (err) {
    return res.status(500).json({error: err.message})
  }
};


module.exports = {authenticationChecker}