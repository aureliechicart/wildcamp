import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


import './home.scss';
import CampgroundSmall from './CampgroundSmall';
import Divider from '../Divider';
import Spinner from '../Spinner';

const Home = ({
  campgrounds,
  loadingCampgrounds,
  clearAddCamgroundForm,
  isAuthenticated
}) => {

  useEffect(() => {
    document.title = `wildcamp`;
  }, []);

  const history = useHistory();

  return (
    <main className="home">
      <h1 className="home-title">Bienvenue dans Wildcamp</h1>

      <Divider />

      <p className="home-subtitle">Découvrez les meilleurs spots de camping sauvage partagés par la communauté Wildcamp&nbsp;:</p>
      {loadingCampgrounds && <Spinner />}
      {!loadingCampgrounds &&
        <div className="campgrounds-small">
          {campgrounds.map((campground) => (
            <CampgroundSmall key={campground.id} {...campground} />
          ))}
        </div>
      }
      <Divider />
      {
        isAuthenticated
          ?
          <div className="add-campground">
            <p className="add-campground-subtitle">Vous avez découvert un spot unique et vous souhaitez le partager&nbsp;?<br /> C'est par ici&nbsp;!</p>
            <div className="button-wrapper">
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
          </div>
          :
          <div className="add-campground">
            <p className="add-campground-subtitle">Vous souhaitez partager un spot&nbsp;?<br />Créez un compte ou connectez&#160;vous dès maintenant&nbsp;!</p>
            <div className="button-wrapper">

              <button
                className="signup-button"
                onClick={() => {
                  history.push('/signup');
                }}
              >
                S'inscrire
              </button>
              <button
                className="login-button"
                onClick={() => {
                  history.push('/login');
                }}
              >
                Se connecter
              </button>
            </div>
          </div>
      }
    </main >
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