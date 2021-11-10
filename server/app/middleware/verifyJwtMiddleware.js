require('dotenv').config();
const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Unauthorized. Access Token was expired" });
  }

  return res.status(401).json({ message: "Unauthorized" });
}

const verifyJwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // if the request has an authorization header, we get its value, extract the token and verify it
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = user;
    next();
  });
};

module.exports = verifyJwtMiddleware;
