const { Router } = require('express');
const router = Router();

// Controllers
const campgroundController = require('./controllers/campgroundController');

/**
 * Returns all campgrounds from the database
 * @route GET /campgrounds
 * @group Campgrounds
 * @returns {Array<Campground>} 200 - An array of campgrounds
 */
router.get('/campgrounds', campgroundController.getAll);

/**
 * Returns a campground from the database based on its id
 * @route GET /campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @returns {<Campground>} 200 - An instance of a campground
 */
router.get('/campgrounds/:id', campgroundController.getOneCampground);

module.exports = router;