import React from 'react';
import PropTypes from 'prop-types';

import './home.scss';
import CampgroundSmall from './CampgroundSmall';
import Spinner from '../Spinner';

const Home = ({ campgrounds, loadingCampgrounds }) => {
  // console.log(campgrounds);

  return (
    <main className="home">
      <h1 className="home-title">Bienvenue dans Wildcamp</h1>
      <p className="home-subtitle">Découvrez les meilleurs spots de camping sauvage partagés par la communauté Wildcamp :</p>
      {loadingCampgrounds && <Spinner />}
      {!loadingCampgrounds &&
        <div className="campgrounds-small">
          {campgrounds.map((campground) => (
            <CampgroundSmall key={campground.id} {...campground} />
          ))}
        </div>
      }
    </main>
  );
};

Home.propTypes = {
  campgrounds: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Home;