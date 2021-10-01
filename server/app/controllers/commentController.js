const Campground = require('../models/campground');
const Comment = require('../models/comment');

const commentController = {
  /**
   * Controls endpoint GET /api/comments
   */
  getAll: async (_, res) => {
    try {
      // we get all the comments from the database
      const theComments = await Comment.findAll();
      res.status(200).json(theComments);

    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  /**
    * Controls endpoint GET /api/comments/:id
    */
  getOneComment: async (req, res) => {

    try {
      // We get the id in the parameters of the request
      const { id } = req.params;

      const oneComment = await Comment.findOne(id);
      res.status(200).json(oneComment);
    }

    catch (err) {
      res.status(404).json(err.message);
    }
  },
  /**
    * Controls endpoint GET /api/campgrounds/:campgroundId/comments
    */
  getAllByCampground: async (req, res) => {
    try {
      // We get the id in the parameters of the request
      const { campgroundId } = req.params;
      // We check if that campground exists in databse
      const campground = await Campground.findOne(campgroundId);
      if (!campground) {
        res.status(404).json({ message: 'Campground not found' });
      } else {
        // we get all the comments for this specific campground
        const theComments = await Comment.findByCampground(campgroundId);
        if (!theComments.length) {
          res.status(404).json({ message: 'No comments found for this campground' })
        } else {
          res.status(200).json(theComments);
        }
      }

    } catch (err) {
      res.status(404).json(err.message);
    }
  },

  /**
   * Controls endpoint POST /api/campground/:campgroundId/comments
   */
  addComment: async (req, res) => {

    try {
      // We get the campground id in the parameters of the request
      const { campgroundId } = req.params;

      // we check if this campground does exist 
      const campground = await Campground.findOne(campgroundId);

      if (!campground) {
        res.status(404).json({ message: 'Campground not found' });
      } else {
        // We get the body parameters of the request
        const { text, user_id } = req.body;
        // TODO check later how we get user_id from client

        // We create a new comment and save it in the database
        const newComment = new Comment({ text, campground_id: campgroundId, user_id });
        // await newComment.save();
        res.status(201).json(newComment);
      }

    }
    catch (err) {
      res.status(404).json(err.message);
    };
  },

};

module.exports = commentController;