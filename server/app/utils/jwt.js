require('dotenv').config();
const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
  console.log('coucou generateaccessToken : ', user);
  return jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });
};

const generateRefreshToken = (user) => {
  console.log('coucou generateRefreshToken : ', user);
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
}