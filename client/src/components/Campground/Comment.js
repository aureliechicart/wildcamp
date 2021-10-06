import React from "react";
import PropTypes from 'prop-types';

const Comment = ({ author, text, modified_at }) => {

  // Calculating how long ago the comment was posted
  const msInADay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((Date.now() - new Date(modified_at)) / msInADay);

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
      <div className="comment-commands">
        <p className="description">{text}</p>
        {/* TODO: add conditional display for this button group
          if logged username is triple equal to comment author, display the button group */}
        <div className="button-group">
          <button
            className="edit-button"
          >
            Modifier
          </button>
          <button
            className="delete-button"
          >
            Supprimer
          </button>
        </div>
      </div>

    </div>
  );

}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;