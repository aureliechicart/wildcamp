import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './home.scss';
import CampgroundSmall from './CampgroundSmall';
import Spinner from '../Spinner';

const Home = ({
  campgrounds,
  loadingCampgrounds,
  isAuthenticated,
  bannerDisplayed,
  setBannerDisplay,
  clearAddCamgroundForm
}) => {

  const history = useHistory();

  return (
    <main className="home">
      {(isAuthenticated && bannerDisplayed) &&
        <div className="success-message">
        Vous êtes bien connecté. Publiez vos spots préférés ou commentez ceux publiés par la communauté !
        <span className="skip-message-button" onClick={() => {setBannerDisplay(false)}}>Ignorer</span></div>
      }
      {(!isAuthenticated && bannerDisplayed) &&
        <div className="login-cta">
        <p className="login-cta-container">
        <Link className="login-cta-link" to="/signup">Créez un compte</Link> ou <Link className="login-cta-link" to="/login">connectez-vous</Link> pour profiter de toutes les possibilités de publication. 
        </p>
        <span className="skip-message-button" onClick={() => {setBannerDisplay(false)}}>Ignorer</span></div>
      }
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
        <button
          className="add-campground-button"
          onClick={() => {
            clearAddCamgroundForm();
            history.push('/new-campground');
          }}
        >
          Ajouter un spot
        </button>
      </div>
    </main>
  );
}

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