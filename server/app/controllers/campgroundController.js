const Campground = require('../models/campground');

const campgroundController = {
  /**
      * Controls endpoint GET /api/campgrounds
      */
  getAll: async (req, res) => {
    try {
      const theCampgrounds = await Campground.findAll();
      res.status(200).json(theCampgrounds);

    } catch (err) {
      res.status(404).json(err.message);
    }
  },

   /**
    * Controls endpoint GET /api/campgrounds/:id
    */
    getOneCampground: async (req, res) => {

      try {
          // We get the id in the parameters of the request
          const { id } = req.params;

          const oneCampground = await Campground.findOne(id);

          res.status(200).json(oneCampground);


      } catch (err) {
          res.status(404).json(err.message);
      };
  },

};

module.exports = campgroundController;