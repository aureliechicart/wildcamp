require('dotenv').config();
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const generateAccessToken = (user) => {
  console.log('coucou generateaccessToken : ', user);
  return jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
    expiresIn: "2m",
  });
};

const generateRefreshToken = (user) => {
  console.log('coucou generateRefreshToken : ', user);
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  refreshTokens, 
  generateAccessToken,
  generateRefreshToken
}