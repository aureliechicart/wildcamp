const { Router } = require('express');
const router = Router();

// Controllers
const campgroundController = require('./controllers/campgroundController');

/**
 * Returns all campgrounds from the database
 * @route GET /api/campgrounds
 * @group Campgrounds
 * @returns {Array<Campground>} 200 - An array of campgrounds
 */
router.get('/campgrounds', campgroundController.getAll);

/**
 * Returns a campground from the database based on its id
 * @route GET /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @returns {<Campground>} 200 - An instance of a campground
 */
router.get('/campgrounds/:id', campgroundController.getOneCampground);

/**
 * Adds a new campground in the database
 * @route POST /api/campgrounds
 * @group Campgrounds
 * @param {string} title.path.required - the title
 * @param {string} image.path.required - the image
 * @param {string} description.path.required - the description
 * @param {string} country.path.required - the country
 * @param {number} userId.path.required - the id of the user who posted the campground
 * @returns {<New Campground>} 200 - An instance of new campground
 */
 router.post('/campgrounds', campgroundController.addNewCampground);

/**
 * Edits a specific campground in the database
 * @route POST /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @param {string} title - the title
 * @param {string} description- the description
 * @returns {<Camground>} 200 - thee updated instance of the campground
 */
 router.put('/campgrounds/:id', campgroundController.changeCampground);

/**
 * Deletes a specific campground in the database
 * @route DELETE /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @returns {<Campground>} 200 - Removal confirmation message
 */
 router.delete('/campgrounds/:id', campgroundController.deleteCampground);

module.exports = router;