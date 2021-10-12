import React, { useRef } from "react";
import PropTypes from 'prop-types';

import useOutsideClick from "../../hooks/useOutsideClick";

const Comment = ({
  id,
  author,
  text,
  modified_at,
  commentEditing,
  selectedCommentId,
  toggleCommentEditing,
  submitEditedComment,
  changeCommentField
}) => {

  const textAreaRef = useRef();

  useOutsideClick(textAreaRef, () => {
    toggleCommentEditing();
  });

  // Calculating how long ago the comment was posted
  const msInADay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((Date.now() - new Date(modified_at)) / msInADay);

  return (
    <div className="comment" >
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
        {(selectedCommentId === id.toString()) && commentEditing ?
          <textarea
            ref={textAreaRef}
            className="edit-textarea"
            type="text"
            value={text}
            onChange={(event) => {
              changeCommentField(event.target.value, id);
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                submitEditedComment(id);
              }
            }}

          />
          : <p
            className="comment-text"
            onDoubleClick={(event) => {
              // TODO: add following conditions
              // if loggedUser === author > toggle commentEditing
              // else > display an error message stating the user cannot edit ohter users'comments
              toggleCommentEditing(id.toString());
            }}>{text}</p>
        }

        {/* TODO: add conditional display for this button group
          if logged username is triple equal to comment author, display the button group */}
        <div className="button-group">
          <button
            className="delete-button"
          >
            Supprimer
          </button>
        </div>
      </div>

    </div >
  );

}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;