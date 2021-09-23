import React from "react";
import { Link } from "react-router-dom";

const CampgroundSmall = ({id, image, title}) => (
  <article className="campground-small">
    <Link to={`/campground/${id}`} title="Afficher le spot">
      <img
        src={image}
        alt=""
      />
      <div className="campground-small-content">
        <h2>{title}</h2>
      </div>
    </Link>
  </article>
);

export default CampgroundSmall;
