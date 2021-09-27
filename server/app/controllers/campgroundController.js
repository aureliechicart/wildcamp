// const Campground = require ('../models/campground');
const db = require('../database');

const campgroundController = {

  getAll: async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM campground;');
      res.json(rows);

    } catch (err) {
      res.status(404).json(err.message);
    }
  },

};

module.exports = campgroundController;