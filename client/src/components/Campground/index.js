import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import "./campground.scss";

import Comment from './Comment';
import Spinner from '../Spinner';

const Campground = ({
  loadingSelectedCampground,
  selectedCampground,
  loadSelectedCampground,
  author,
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
  deleteCampground,
  campgroundNotFound,
  errors,
  clearAddCamgroundForm,
  clearSelectedCampground,
  isAuthenticated,
  loggedInUser
}) => {
  const { id } = useParams();

  const history = useHistory();
  const editRouteChange = () => {
    const path = `/edit-campground/${selectedCampground.id}`;
    history.push(path);
  }

  // if the id in params of the url changes, we load the corresponding
  // campground from db
  useEffect(() => {
    loadSelectedCampground(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (campgroundNotFound) {
      history.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campgroundNotFound]);


  return (
    <main className="main">
      <div className="campground">
        <h1 className="campground-heading">Spot Wildcamp</h1>
        {loadingSelectedCampground && <Spinner />}

        {!loadingSelectedCampground && (
          <div>
            <div className="campground-thumbnail">
              <img
                className="campground-image"
                src={selectedCampground.image}
                alt="Spot de camping sauvage"
              />
              <div className="campground-details">
                <div className="campground-details-main">
                  <h2 className="campground-details-title">{selectedCampground.title}</h2>
                  <span className="campground-details-country">{selectedCampground.country}</span>
                </div>

                <p className="campground-details-description">
                  {selectedCampground.description}
                </p>
                <div className="campground-details-commands">
                  <p className="author">
                    Partagé par : <span className="author-name">{author}</span>
                  </p>
                  {/* TODO: add conditional display for this button group
                  if logged username is triple equal to author, display the button group */


                  }
                  {isAuthenticated && (loggedInUser.id === selectedCampground.user_id) && (
                    <div className="button-group">
                      <button
                        className="edit-button"
                        onClick={editRouteChange}
                      >
                        Modifier
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          deleteCampground(id);
                          clearSelectedCampground();
                          history.push('/');
                        }}
                      >
                        Supprimer
                      </button>
                    </div>

                  )}
                </div>
                {errors.notAuthor &&
                  <div className="error">Suppression impossible : seul l'auteur de cette publication peut la supprimer</div>
                }
              </div>
            </div>

            <div className="comments-container">
              {!addCommentEditing &&
                <div className="comment-button-container">
                  <button
                    className="comment-button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        // set error: please log in to add comments (login link)
                        console.log('You must be logged in to comment');
                      } else {
                        toggleAddCommentEditing();
                      }
                    }}
                  >
                    Ajouter un commentaire
                  </button>
                </div>
              }
              {!isAuthenticated &&
                <div>Vous devez être connecté pour ajouté un commentaire. <Link to="/login">Connectez-vous</Link></div>}
              {addCommentEditing &&
                <div className="add-comment-container">
                  <label className="add-comment-label" htmlFor="add-comment">
                    <textarea
                      className="add-comment-textarea"
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
              <hr />

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
                {!comments.length && (
                  <p>Soyez le ou la première à partager un commentaire !</p>
                )}
              </div>
            </div>

            <div className="button-container">
              <button
                className="add-campground-button"
                onClick={() => {
                  clearAddCamgroundForm();
                  history.push('/new-campground');
                }}
              >
                Ajouter un nouveau spot
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

Campground.propTypes = {
  loadingSelectedCampground: PropTypes.bool.isRequired,
  loadSelectedCampground: PropTypes.func.isRequired,
  selectedCampground: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
  }),
  author: PropTypes.string.isRequired,
  comments: PropTypes.array,
};

export default Campground;
