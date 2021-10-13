import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams, Link, useHistory } from 'react-router-dom';

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
  campgroundDeleted
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

  // on campground deletion: if the value of campgroundDeleted
  // changes and turns to true, we redirect to the home page
  useEffect(() => {
    if(campgroundDeleted) {
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campgroundDeleted]);

  

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
                  if logged username is triple equal to author, display the button group */}
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
                        console.log("campgroundId : ", id);
                        deleteCampground(id);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="comments-container">
              {!addCommentEditing &&
                <div className="comment-button-container">
                  <button
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
                        value={newCommentValue}
                        title="add-comment"
                        placeholder="Ajoutez un commentaire..."
                        onChange={(event) => {
                          changeAddCommentField(event.target.value);
                        }}
                      />
                    </label>
                    <div className="add-comment-button-container">
                    <button
                      className="submit-comment"
                      onClick={() => {
                        submitNewComment(selectedCampground.id);
                      }}
                    >
                      Valider
                    </button>
                    <button className="cancel-comment"
                    onClick={()=> {
                      toggleAddCommentEditing();
                    }}>Annuler</button>
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
                    />
                  ))}
                {!comments.length && (
                  <p>Soyez le ou la première à partager un commentaire !</p>
                )}
              </div>
            </div>

            <div className="button-container">
              <Link
                className="add-campground-button"
                to="/new-campground"
              >
                Ajouter un nouveau spot
              </Link>
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
  }).isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.array,
};

export default Campground;
