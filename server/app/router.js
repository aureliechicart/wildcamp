const { Router } = require('express');
const router = Router();

// Controllers
const loginController = require('./controllers/loginController');
const campgroundController = require('./controllers/campgroundController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');

// Middleware
const verifyJwt = require('./middleware/verifyJwtMiddleware');

// Schemas
const { validateBody } = require('./services/validator');
const campgroundSchema = require('./schemas/campgroundSchema');
const commentSchema = require('./schemas/commentSchema');
const signupSchema = require('./schemas/signupSchema');
const loginSchema = require('./schemas/loginSchema');

/*****************LOGIN *******************/

/**
* Returns a new user added in the database
* @route POST /api/signup
* @group Login
* @param {string} email.path.required - the user email
* @param {string} username.path.required - the username
* @param {string} password.path.required - the password
* @param {string} passwordConfirm.path.required - the confirmation of the password
* @returns {<User>} 200 - An instance of a user
*/
router.post('/signup', validateBody(signupSchema.newSignup), loginController.doSignup);

/**
* Returns the logged user from the database
* @route POST /api/login
* @group Login
* @param {string} email.path.required - the user email
* @param {string} password.path.required - the password
* @returns {<User>} 200 - An instance of a user
*/
router.post('/login', validateBody(loginSchema.newLogin),loginController.doLogin);

/**
* Returns new access token and new refresh token
* @route POST /api/refresh
* @param {string} token.path.required - the refresh token
* @group Login
*/
router.post('/refresh', loginController.refreshToken);

/**
* Returns the user based on the token in cookie
* @route GET /api/auth/user
* @group Login
*/
router.get('/auth/user', loginController.getUserFromCookie);

/**
* Returns new access token and new refresh token
* @route POST /api/logout
* @param {string} token.path.required - the refresh token
* @group Login
*/
router.post('/logout', loginController.doLogout);

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
 * @returns {<New Campground>} 201 - An instance of new campground
 */
router.post('/campgrounds', verifyJwt, validateBody(campgroundSchema.newCampground), campgroundController.addNewCampground);

/**
 * Edits a specific campground in the database
 * @route PUT /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @param {string} title - the title
 * @param {string} description- the description
 * @returns {<Camground>} 200 - thee updated instance of the campground
 */
router.put('/campgrounds/:id', verifyJwt, validateBody(campgroundSchema.updateCampground), campgroundController.editCampground);

/**
 * Deletes a specific campground in the database
 * @route DELETE /api/campgrounds/{id}
 * @group Campgrounds
 * @param {number} id.path.required - the campground id
 * @returns {<Campground>} 200 - Removal confirmation message
 */
router.delete('/campgrounds/:id', verifyJwt, campgroundController.deleteCampground);

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
router.post('/campgrounds/:campgroundId/comments', verifyJwt, validateBody(commentSchema.newComment), commentController.addComment);

/**
* Edits a specific comment in the database
* @route PUT /api/comments/{id}
* @group Comments
* @param {number} id.path.required - the comment id
* @param {string} text - the text
* @returns {<Comment>} 200 - thee updated instance of the comment
*/
router.put('/comments/:id', verifyJwt, validateBody(commentSchema.updateComment), commentController.editComment);

/**
* Deletes a specific comment in the database
* @route DELETE /api/comments/{id}
* @group Comments
* @param {number} id.path.required - the comment id
* @returns 200 - Removal confirmation message
*/
router.delete('/comments/:id', verifyJwt, commentController.deleteComment);


module.exports = router;