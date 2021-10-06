import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

import "./campground.scss";

import Comment from './Comment';
import Spinner from '../Spinner';

const Campground = ({
  loadingSelectedCampground,
  selectedCampground,
  loadSelectedCampground,
  author,
  comments
}) => {
  const { id } = useParams();

  useEffect(() => {
    loadSelectedCampground(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
            </div>

            <div className="comments-container">
              <div className="comment-button-container">
                <button className="comment-button" href={`/campgrounds/${selectedCampground.id}/comments/new`}>
                  Ajouter un commentaire
                </button>
              </div>
              <hr />

              <div className="comments">
                {comments &&
                  comments.map((comment) => (
                    <Comment key={comment.id} {...comment} />
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
