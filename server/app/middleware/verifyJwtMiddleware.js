require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  // if the request has an authorization header, we get its value, extract the token and verify it
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      // if token is successfully verified, we attach the user to the request object
      req.user = user;
      next();
    });

  } else {
    res.status(401).json("The user is not authenticated");
  }
};

module.exports = verifyJwtMiddleware;
