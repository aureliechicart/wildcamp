import React from "react";
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import "./campground.scss";

import Comment from './Comment';

const Campground = ({ campgrounds }) => {
  const { id } = useParams();

  const campground = campgrounds.find((campground) => campground.id === parseInt(id, 10));

  return (
    <main className="main">
      <div className="campground">
        <h1 className="campground-heading">Spot Wildcamp</h1>
        <div className="campground-thumbnail">
          <img
            className="campground-image"
            src={campground.image}
            alt="Spot de camping sauvage"
          />
          <div className="campground-details">
            <div className="campground-details-main">
              <h2 className="campground-details-title">{campground.title}</h2>
              <span className="campground-details-country">{campground.country}</span>
            </div>
            <p className="campground-details-description">
              {campground.description}
            </p>
            <p className="campground-details-author">
              Partagé par : <span className="author-name">{campground.author.username}</span>
            </p>
          </div>
        </div>

        <div className="comments-container">
          <div className="comment-button-container">
            <a className="comment-button" href={`/campgrounds/${campground.id}/comments/new`}>
              Ajouter un commentaire
            </a>
          </div>
          <hr />

          <div className="comments">
            {campground.comments &&
              campground.comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            {!campground.comments && (
             <p>Soyez le premier à partager un commentaire !</p> 
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

Campground.propTypes = {
  campgrounds: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired
      }).isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          author: PropTypes.shape({
            username: PropTypes.string.isRequired
          }).isRequired,
        }))
    }).isRequired,
  ).isRequired,
};

export default Campground;
