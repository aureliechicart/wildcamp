import React from "react";
import PropTypes from 'prop-types';

const Comment = ({ author, text, modified_at }) => {

// Calculating how long ago the comment was posted
const msInADay= 1000*60*60*24;
const diffDays = Math.floor((Date.now() - new Date(modified_at))/msInADay);

  return (
    <div className="comment">
      <div className="comment-info">
        <p className="comment-author">{author}</p>
        {diffDays <= 1 &&
          <span className="comment-date">
          il y a {diffDays} jour
          </span>
        }
        {diffDays > 1 &&
          <span className="comment-date">
          il y a {diffDays} jours
          </span>
        }
      </div>
      <p className="comment-description">{text}</p>
    </div>
  );

}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;