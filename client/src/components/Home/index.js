import React from 'react';
import PropTypes from 'prop-types';

import './home.scss';
import CampgroundSmall from './CampgroundSmall';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

const Home = ({ campgrounds, loadingCampgrounds }) => (
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
    {/* TODO: si l'utilisateur n'est pas connecté, lui proposer
      de s'inscrire ou de se connecter
      sinon afficher la div d'ajout de spot */}

    <div className="add-campground">
      <p className="add-campground-subtitle">Vous avez découvert un spot unique et vous souhaitez le partager&nbsp;? C'est par ici&nbsp;!</p>
      <Link
        className="add-campground-button"
        to="/new-campground"
      >
        Ajouter un spot
      </Link>
    </div>
  </main>
);

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