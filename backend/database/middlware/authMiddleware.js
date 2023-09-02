const jwt = require("jsonwebtoken");

// Middleware to check if the request has a valid JWT token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "thisisverhardsecretkeyeiei");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};
