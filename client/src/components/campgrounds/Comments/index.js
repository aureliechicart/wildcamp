import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWindowClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import "./comment.scss";

import Comment from './Comment';

const Comments = ({
  selectedCampground,
  comments,
  commentEditing,
  toggleCommentEditing,
  selectedCommentId,
  submitEditedComment,
  changeCommentField,
  deleteComment,
  addCommentEditing,
  toggleAddCommentEditing,
  newCommentValue,
  changeAddCommentField,
  submitNewComment,
  isAuthenticated,
  loggedInUser
}) => {

  return (
    <div className="comments-container">
      {!isAuthenticated &&
        <div className="comment-login-cta">
          <Link to="/login" className="comment-login-cta-link">
            <FontAwesomeIcon
              icon={faInfoCircle}
              title="Information"
              className="info-icon"
            />
            <span className="comment-login-cta-description">
              Connectez-vous pour ajouter un commentaire
            </span>
          </Link>
        </div>
      }

      <div className="comments">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              commentEditing={commentEditing}
              toggleCommentEditing={toggleCommentEditing}
              selectedCommentId={selectedCommentId}
              submitEditedComment={submitEditedComment}
              changeCommentField={changeCommentField}
              deleteComment={deleteComment}
              isAuthenticated={isAuthenticated}
              loggedInUser={loggedInUser}
            />
          ))}
        {!comments.length && isAuthenticated && (
          <div className="no-comment-info">
            <FontAwesomeIcon
              icon={faInfoCircle}
              title="Information"
              className="info-icon"
            />
            <span className="no-comment-info-description">Soyez le ou la premi??re ?? partager un commentaire&nbsp;!</span>
          </div>
        )}
      </div>
      {!commentEditing && !addCommentEditing && isAuthenticated &&
        <div className="comment-button-container">
          <button
            type="button"
            className="comment-button"
            onClick={() => {
              toggleAddCommentEditing();
            }}
          >
            Ajouter un commentaire
          </button>
        </div>
      }
      {addCommentEditing &&
        <div className="add-comment-container">
          <label className="add-comment-label" htmlFor="add-comment">
            <textarea
              className="add-comment-textarea"
              type="text"
              rows="4"
              value={newCommentValue}
              title="add-comment"
              placeholder="Ajoutez un commentaire..."
              onChange={(event) => {
                changeAddCommentField(event.target.value);
              }}
            />
          </label>
          <div className="add-comment-icon-container">
            <React.Fragment>
              <FontAwesomeIcon
                icon={faSave}
                title="Enregistrer"
                className="comment-icon"
                onClick={() => {
                  submitNewComment(selectedCampground.id);
                }}
              />
              <FontAwesomeIcon
                icon={faWindowClose}
                title="Annuler"
                className="comment-icon"
                onClick={() => {
                  toggleAddCommentEditing();
                }}
              />
            </React.Fragment>
          </div>
        </div>
      }
    </div>
  );
}

Comments.propTypes = {
  selectedCampground: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    user_id: PropTypes.number
  }),
  comments: PropTypes.array.isRequired,
  commentEditing: PropTypes.bool.isRequired,
  toggleCommentEditing: PropTypes.func.isRequired,
  selectedCommentId: PropTypes.string.isRequired,
  submitEditedComment: PropTypes.func.isRequired,
  changeCommentField: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addCommentEditing: PropTypes.bool.isRequired,
  toggleAddCommentEditing: PropTypes.func.isRequired,
  newCommentValue: PropTypes.string.isRequired,
  changeAddCommentField: PropTypes.func.isRequired,
  submitNewComment: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    username: PropTypes.string
  })
};

export default Comments;
