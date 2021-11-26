import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const CampgroundSmall = ({ id, image, title }) => (
  <article className="campground-small">
    <Link className="campground-small-link" to={`/campground/${id}`} title="Afficher le spot">
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

CampgroundSmall.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CampgroundSmall;
