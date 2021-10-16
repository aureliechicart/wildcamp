const bcrypt = require('bcrypt');

const User = require('../models/user');

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

  // TODO: adding signup, login and logout methods
  /**
     * Controls endpoint POST /api/signup
     */
  doSignup: async (req, res) => {
    try {
      // we get the values from the body
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
      const hash = bcrypt.hashSync(password, saltRounds);

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

  /**
     * Controls endpoint POST /api/login
     */
  doLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      // we check the user exists in db
      const user = await User.findOneByEmail(email);

      // if user doesn't exist, we send a message
      if (!user) {
        res.status(400).json({ message: 'No user found with this email' });
        return;
      }

      // we compare the password provided and the hash in db using bcrypt
      const isPwdValid = bcrypt.compareSync(password, user.password);

      // if the password validation fails, we send a message
      if (!isPwdValid) {
        res.status(400).json({ message: 'Incorrect password' });
        return;
      }

      // if all is validated, we sent the user info
      res.status(202).json({
        message: 'User successfully logged in',
        ...user
      });

    } catch (err) {
      res.status(500).json(err.message);
    }
  }

};

module.exports = userController;