import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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
                <p className="campground-details-author">
                  Partagé par : <span className="author-name">{author}</span>
                </p>
              </div>
            </div>

            <div className="comments-container">
              <div className="comment-button-container">
                <a className="comment-button" href={`/campgrounds/${selectedCampground.id}/comments/new`}>
                  Ajouter un commentaire
                </a>
              </div>
              <hr />

              <div className="comments">
                {comments &&
                  comments.map((comment) => (
                    <Comment key={comment.id} {...comment} />
                  ))}
                {!comments.length && (
                  <p>Soyez le premier à partager un commentaire !</p>
                )}
              </div>
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
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.array,
};

export default Campground;
