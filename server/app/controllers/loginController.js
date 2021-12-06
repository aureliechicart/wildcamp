require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/jwt');

const loginController = {
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
        res.status(400).json({
          success: false,
          alreadyRegistered: true,
          message: 'A user will this email is already registered'
        });
        return;
      }

      // we check that password and passwordConfirm are identical
      // if not we send a message
      if (password !== passwordConfirm) {
        res.status(400).json({
          success: false,
          passwordsDiffer: true,
          message: 'The password and password confirmation are different'
        });
        return;
      }

      // we create the password hash
      const saltRounds = 10;
      const hash = await bcrypt.hashSync(password, saltRounds);

      // we save the new user in db
      const newUser = new User({
        email: email,
        password: hash,
        username: username,
      });
      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          email: newUser.email,
          username: newUser.username,
          id: newUser.id
        }
      });

    } catch (err) {
      response.status(500).json(err.message);
    }
  },

  // an array to store generated refresh tokens
  // we filter them out on refresh and logout
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
        return res.status(404).json({
          success: false,
          noUserFound: true,
          message: 'No user found with this email'
        });
      }
      // we compare the password provided and the hash in db using bcrypt
      const isPwdValid = await bcrypt.compareSync(password, user.password);

      // if the password validation fails, we send a message
      if (!isPwdValid) {
        return res.status(401).json({
          success: false,
          incorrectPassword: true,
          message: 'Incorrect password'
        });
      }

      //  we generate an access token and a refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // we add the new refresh token to the array
      loginController.refreshTokens.push(refreshToken);
      console.log('array refreshTokens : ', loginController.refreshTokens);

      // we add the refresh token in an httpOnly cookie
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false
      });

      // we send the user info and tokens
      res.status(202).json({
        success: true,
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
      return res.status(403).json({ message: "Refresh Token is required" });
    }

    console.log('array refreshTokens : ', loginController.refreshTokens);
    // we send an error if the refreshToken doesn't appear in our array
    if (!loginController.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }

    let currentDate = new Date();

    // we then verify the token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      // in case of error, we log the error
      err && console.log('jwt verify error in refresh route', err);
      console.log('decoded : ', decoded);

      // if the refreshToken is expired, we require a new login
      if (decoded.exp * 1000 < currentDate.getTime()) {
        // we clear the cookie by resetting it with zero age 
        res.cookie('refresh_token', '', { maxAge: 0 });
        // we clear localStorage
        localStorage.clear();
        return res.status(403).json({ message: 'Refresh token was expired. Please make a new login request' });
      }

      // if the token is successfully validated, we remove it from our array
      loginController.refreshTokens = loginController.refreshTokens.filter((token) => token !== refreshToken);

      // we create a new access token and a new refresh token 
      const newAccessToken = generateAccessToken(decoded);
      const newRefreshToken = generateRefreshToken(decoded);

      // we push the new refresh token in our array
      loginController.refreshTokens.push(newRefreshToken);

      // we add the refresh token in an httpOnly cookie
      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: false
      });

      // we send back the new access token and refresh token
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  /**
     * Controls endpoint GET /api/auth/user
     */
  getUserFromCookie: async (req, res) => {
    try {
      const cookie = req.cookies['refresh_token'];

      const claims = jwt.verify(cookie, process.env.JWT_REFRESH_SECRET);
      console.log(claims);
      if (!claims) {
        console.log('coucou erreur du jwt verify');
        return res.status(401).json({
          success: false,
          message: 'Unauthenticated'
        });
      }

      const user = await User.findOne(claims.id);

      // we return all the user info, except the password
      const { password, ...data } = user;

      res.status(200).json(data);

    } catch (err) {
      // if there is no cookie set, verify method throws an error
      return res.status(401).json({
        success: false,
        message: 'Unauthenticated (no cookie set yet)'
      });
    }
  },

  /**
     * Controls endpoint POST /api/logout
     */
  doLogout: async (req, res) => {
    // we get the token from the body
    const refreshToken = req.body.token;

    // we remove it from our array to invalidate it
    loginController.refreshTokens = loginController.refreshTokens.filter((token) => token !== refreshToken);

    // we clear the cookie by resetting it with zero age 
    res.cookie('refresh_token', '', { maxAge: 0 });

    // we send back a confirmation message
    res.status(200).json({ message: "User logged out successfully" });
  }

};

module.exports = loginController;
