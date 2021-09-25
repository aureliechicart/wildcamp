import React from "react";
import PropTypes from 'prop-types';

const Comment = ({author, text}) => (
  <div className="comment">
  <div className="comment-info">
    <p className="comment-author">{author.username}</p>
    <span className="comment-date">il y a 10 jours</span>
  </div>
  <p className="comment-description">{text}</p>
</div>
);

Comment.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;