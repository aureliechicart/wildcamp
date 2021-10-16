const { Router } = require('express');
const router = Router();

// Controllers
const campgroundController = require('./controllers/campgroundController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');

// Middleware
const verifyJwt = require('./middleware/verifyJwtMiddleware');

/*****************LOGIN *******************/

/**
* Returns a new user added in the database
* @route POST /api/signup
* @group Users
* @returns {<User>} 200 - An instance of a user
*/
router.post('/signup', userController.doSignup);

/**
* Returns the logged user from the database
* @route POST /api/login
* @group Users
* @returns {<User>} 200 - An instance of a user
*/
router.post('/login', userController.doLogin);

/**
* Returns new access token and new refresh token
* @route POST /api/refresh
* @group Users
*/
router.post('/refresh', userController.refreshToken);

/*****************USERS *******************/

/**
 * Returns all users from the database
 * @route GET /api/users
 * @group Users
 * @returns {Array<User>} 200 - An array of users
 */
router.get('/users', userController.getAll);

/**
 * Returns a user from the database based on its id
 * @route GET /api/users/{id}
 * @group Users
 * @param {number} id.path.required - the user id
 * @returns {<User>} 200 - An instance of a user
 */
router.get('/users/:id', userController.getOneUser);


/*****************CAMPGROUNDS *******************/

/**
 * Returns all campgrounds from the database
 * @route GET /api/campgrounds
 * @group Campgrounds
 * @returns {Array<Campground>} 200 - An array of campgrounds
 */
router.get('/campgrounds', verifyJwt, campgroundController.getAll);

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
 * @returns {<New Campground>} 201 - An instance of new campground
 */
router.post('/campgrounds', campgroundController.addNewCampground);

/**
 * Edits a specific campground in the database
 * @route PUT /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @param {string} title - the title
 * @param {string} description- the description
 * @returns {<Camground>} 200 - thee updated instance of the campground
 */
router.put('/campgrounds/:id', campgroundController.editCampground);

/**
 * Deletes a specific campground in the database
 * @route DELETE /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @returns {<Campground>} 200 - Removal confirmation message
 */
router.delete('/campgrounds/:id', campgroundController.deleteCampground);

/*****************COMMENTS *******************/

/**
 * Returns all comments from the database
 * @route GET /api/comments
 * @group Comments
 * @returns {Array<Comment>} 200 - An array of comments
 */
router.get('/comments', commentController.getAll);

/**
* Returns a comment from the database based on its id
* @route GET /api/comments/{id}
* @group Comments
* @param {number} id.path.required - the comment id
* @returns {<Comment>} 200 - An instance of a comment
*/
router.get('/comments/:id', commentController.getOneComment);

/**
 * Returns all comments for one specific campground
 * @route GET /api/campgrounds/{campgroundId}/comments
 * @group Comments
 * @returns {Array<Comment>} 200 - An array of comments
 */
router.get('/campgrounds/:campgroundId/comments', commentController.getAllByCampground);

/**
* Adds a new comment in the database
* @route POST /api/campgrounds/{campgroundId}/comments
* @group Comments
* @param {number} campgroundId.path.required - the id of the campground
* @param {string} text.path.required - the text
* @param {number} userId.path.required - the id of the user who posted the comment
* @returns {<New Comment>} 201 - An instance of new comment
*/
router.post('/campgrounds/:campgroundId/comments', commentController.addComment);

/**
* Edits a specific comment in the database
* @route PUT /api/comments/{id}
* @group Comments
* @param {number} id.path.required - the comment id
* @param {string} text - the text
* @returns {<Comment>} 200 - thee updated instance of the comment
*/
router.put('/comments/:id', commentController.editComment);

/**
* Deletes a specific comment in the database
* @route DELETE /api/comments/{id}
* @group Comments
* @param {number} id.path.required - the comment id
* @returns 200 - Removal confirmation message
*/
router.delete('/comments/:id', commentController.deleteComment);


module.exports = router;