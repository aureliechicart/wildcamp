import React from 'react';

import './campground.scss';

const Campground = () => (
  <main className="main">

    <div className="campground">

      <div className="campground-thumbnail">
        <img className="campground-image" src="https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg" alt="Spot de camping sauvage" />
        <div class="campground-details">
          <h4 className="campground-details-title">Mesa du désert</h4>
          <p className="campground-details-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <p className="campground-details-author">Partagé par : <span className="author-name">Carrot</span></p>
        </div>
      </div>

      <div className="comments-container">
        <div className="comment-button-container">
          <a className="comment-button" href="/campgrounds/122/comments/new">Ajouter un commentaire</a>
        </div>
        <hr />

        <div className="comments">
          <div className="comment">
            <div className="comment-info">
              <p className="comment-author">Parsnip</p>
              <span className="comment-date">il y a 10 jours</span>
            </div>
            <p className="comment-description">Super spot !</p>
          </div>
          <div className="comment">
            <div className="comment-info">
              <p className="comment-author">Rutabaga</p>
              <span className="comment-date">il y a 11 jours</span>
            </div>
            <p className="comment-description">Je recommande aussi</p>
          </div>
        </div>
      </div>

    </div>

  </main>
);

export default Campground;