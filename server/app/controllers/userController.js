require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { 
  generateAccessToken,
  generateRefreshToken
  } = require('../utils/jwt');

const userController = {
  /**
  * Controls endpoint GET /api/users
  */
  getAll: async (_, res) => {

    try {
      // We get all the users are retrieved from the database
      const allUsers = await User.findAll();
      res.status(200).json(allUsers);

    } catch (err) {
      res.status(500).json(err.message);
    }

  },

  /**
   * Controls endpoint GET /api/users/:id
   */
  getOneUser: async (req, res) => {

    try {
      // We get the id in the params of the request
      const { id } = req.params;

      const oneUser = await User.findOne(id);

      if (!oneUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(oneUser);
      }

    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  /**
     * Controls endpoint POST /api/signup
     */
  doSignup: async (req, res) => {
    try {
      // we get the input values from the body
      const { email, username, password, passwordConfirm } = req.body;

      // check if user exists in db
      const user = await User.findOneByEmail(email);

      // if user exists, we send a message saying they are already registered
      if (user) {
        res.status(400).json({ message: 'A user will this email is already registered' });
        return;
      }

      // we check that password and passwordConfirm are identical
      // if not we send a message
      if (password !== passwordConfirm) {
        res.status(400).json({ message: 'The password and password confirmation are different' });
        return;
      }

      // we create the password hash
      const saltRounds = 10;
      const hash = await bcrypt.hashSync(password, saltRounds);

      console.log(password, hash);

      // we save the new user in db
      const newUser = new User({
        email: email,
        password: hash,
        username: username,
      });
      await newUser.save();

      res.status(200).json(newUser);

    } catch (err) {
      response.status(500).json(err.message);
    }
  },
  // an array of refresh tokens
  // where we push a new token then filter it out on refresh
  refreshTokens: [],
  /**
     * Controls endpoint POST /api/login
     */
  doLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // we check the user exists in db
      const user = await User.findOneByEmail(email);

      // if user doesn't exist, we send a message
      if (!user) {
        res.status(400).json({ message: 'No user found with this email' });
        return;
      }
      // we compare the password provided and the hash in db using bcrypt
      const isPwdValid = await bcrypt.compareSync(password, user.password);

      // if the password validation fails, we send a message
      if (!isPwdValid) {
        res.status(400).json({ message: 'Incorrect password' });
        return;
      }

      //  we generate an access token and a refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // we add the new refresh token to the array
      console.log('userController.refreshTokens: ', userController.refreshTokens);
      userController.refreshTokens.push(refreshToken);

      // we send the user info and tokens
      res.status(202).json({
        message: 'User successfully logged in',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          accessToken,
          refreshToken
        },
      });

    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  

  /**
     * Controls endpoint POST /api/refresh
     */
  refreshToken: async (req, res) => {
    //we get the refresh token from the user
    const refreshToken = req.body.token;

    //we send an error if there is no token or it is invalid
    if (!refreshToken) {
      return res.status(401).json("User is not authenticated");
    }

    // we send an error if the refreshToken doen't appear in our array
    if (!userController.refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }

    // we then verify the token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      // in case of error, we log the error
      err && console.log(err);

      // if the token is successfully validated, we remove it from our array
      userController.refreshTokens = userController.refreshTokens.filter((token) => token !== refreshToken);

      // we create a new access token and a new refresh token 
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // we push the new refresh token in our array
      userController.refreshTokens.push(newRefreshToken);

      // we send back the new access token and refresh token
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  }

};

module.exports = userController;