require('dotenv').config();
const jwt = require('jsonwebtoken');


const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
    expiresIn: "5min",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
}