import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundSmall = () => (
  <article className="campground-small">
    <img
      src="https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg"
      alt=""
    />
    <div className="campground-small-content">
      <Link to="/campground/122" title="Afficher le spot"><h2>Mesa du desert</h2></Link>
    </div>
  </article>
);

export default CampgroundSmall;