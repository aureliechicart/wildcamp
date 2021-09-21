import React from "react";
import { Link } from "react-router-dom";

const CampgroundSmall = () => (
  <article className="campground-small">
    <Link to="/campground/122" title="Afficher le spot">
      <img
        src="https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg"
        alt=""
      />
      <div className="campground-small-content">
        <h2>Mesa du desert</h2>
      </div>
    </Link>
  </article>
);

export default CampgroundSmall;
