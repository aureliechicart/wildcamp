import React from "react";
import { useParams } from 'react-router-dom';

import "./campground.scss";

import Comment from './Comment';

const Campground = ({ campgrounds }) => {
  const { id } = useParams();

  const campground = campgrounds.find((campground) => campground.id === parseInt(id, 10));
  console.log(parseInt(id, 10));
  console.log(campground);


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
          <div class="campground-details">
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

export default Campground;
