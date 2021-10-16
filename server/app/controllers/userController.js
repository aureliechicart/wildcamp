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

};

module.exports = userController;