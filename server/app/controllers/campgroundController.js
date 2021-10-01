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

  /**
    * Controls endpoint POST /api/campgrounds
    */
  addNewCampground: async (req, res) => {
    try {
      // We get the body parameters of the request
      const { title, image, description, country, user_id } = req.body;
      // TODO check how we get user_id from client
      // we can save this new record in the database
      const newCampground = new Campground({ title, image, description, country, user_id });
      await newCampground.save();
      res.status(201).json(newCampground);

    } catch (err) {
      res.status(500).json(err.message);
    };
  },

  /**
    * Controls endpoint PUT /api/campgrounds/:id
    */
  changeCampground: async (req, res) => {
    try {
      // we get the campground id from the params 
      const { id } = req.params;
      // we check if campground exists in the database
      const campground = await Campground.findOne(id);

      if (campground) {
        // if campground exists, we get the body parameters
        const { title, image, description, country, user_id } = req.body;
        // TODO check how we get user_id from client

        //If a parameter is provided, we update the campground accordingly
        if (title) {
          campground.title = title;
        }
        if (image) {
          campground.image = image;
        }
        if (description) {
          campground.description = description;
        }
        if (country) {
          campground.country = country;
        }
        if (user_id) {
          campground.user_id = user_id;
        }

        // we save the changes in database
        await campground.save();
        res.status(200).json(campground);
      } else {
        res.status(404).json({ message: 'Campground not found' });
      }

    } catch (err) {
      res.status(404).json(err.message);
    };
  },

};

module.exports = campgroundController;