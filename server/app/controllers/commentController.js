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
      if (!oneComment) {
        res.status(404).json({ message: 'No comment found with this id' });
      } else {
        res.status(200).json(oneComment);
      }
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
        res.status(404).json({
          campgroundNotFound: true,
          message: 'No campground found with this id'
        });
      } else {
        // we get all the comments for this specific campground
        const theComments = await Comment.findByCampground(campgroundId);
        if (!theComments.length) {
          res.status(404).json({
            noComments: true,
            message: 'No comments found for this campground'
          })
        } else {
          res.status(200).json(theComments);
        }
      }

    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  /**
   * Controls endpoint POST /api/campgrounds/:campgroundId/comments
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

        // We create a new comment and save it in the database
        const newComment = new Comment({ text, campground_id: campgroundId, user_id });
        await newComment.save();
        res.status(201).json(newComment);
      }

    }
    catch (err) {
      res.status(404).json(err.message);
    };
  },

  /**
    * Controls endpoint PUT /api/comments/:id
    */
  editComment: async (req, res) => {

    try {
      // We get the comment id in the parameters of the request
      const { id } = req.params;

      // We check if the comment exists
      const comment = await Comment.findOne(id);

      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {

        // We get the text, in the body
        // We don't need user_id or campground_id as those won't change
        const { text } = req.body;

        //  If a parameter is provided, we update the mission accordingly
        if (text) {
          comment.text = text;
        };

        // Then we save the changes in database
        await comment.save();
        res.status(200).json(comment);
      }

    } catch (err) {
      res.status(404).json(err.message)
    };
  },

  /**
    * Controls endpoint DELETE /api/comments/:id
    */
  deleteComment: async (req, res) => {
    try {
      // We get the comment id in the parameters of the request
      const { id } = req.params;

      // We check the mission id
      const comment = await Comment.findOne(id);

      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        // If found, we delete the comment
        await comment.delete();
        res.status(200).json({ message: 'Comment successfully deleted' });
      }

    } catch (err) {
      res.status(500).json(err.message);
    };
  },

};

module.exports = commentController;