import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';

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
  changeCommentField,
  deleteComment,
  isAuthenticated,
  loggedInUser
}) => {

  const textAreaRef = useRef();

  // when the user double-clicked on a comment, it changes the comment into an editable mode
  // when the user clicks outside this textarea, the editing mode is changed to false
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
          />
          : <div>
            <p
              className="comment-text"
              onDoubleClick={() => {
                // Only the author can edit their own comment
                if (isAuthenticated && loggedInUser.username === author) {
                  toggleCommentEditing(id.toString());
                }
              }}>
              {text}
            </p>
            {/* TODO: add a condition to check loggedUser is author */}
            {isAuthenticated && loggedInUser.username === author &&
              <p className="edit-hint">Double-cliquez pour modifier</p>
            }
          </div>
        }

        {/* TODO: add conditional display for this icon group
          if logged username is triple equal to comment author, display the button group */}
        {isAuthenticated && loggedInUser.username === author &&
          <div className="icon-group">

            {(selectedCommentId === id.toString()) && commentEditing
              ?
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faSave}
                  title="Enregistrer"
                  className="comment-icon"
                  onClick={() => {
                    submitEditedComment(id);
                  }}
                />
                <FontAwesomeIcon
                  icon={faWindowClose}
                  title="Annuler"
                  className="comment-icon"
                  onClick={() => {
                    toggleCommentEditing(id.toString());
                  }}
                />
              </React.Fragment>
              :
              <FontAwesomeIcon
                icon={faTrash}
                className="comment-icon"
                title="Supprimer"
                onClick={() => {
                  deleteComment(id);
                }}
              />
            }
          </div>
        }
      </div>

    </div >
  );

}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;