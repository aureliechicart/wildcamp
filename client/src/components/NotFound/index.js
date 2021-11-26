import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './notfound.scss';
import logo from '../layout/Navbar/logo.png';
// == Component
const NotFound = ({
  setCampgroundNotFound
}) => {

  useEffect(() => {
    setCampgroundNotFound(false);
  });

  return (
    <div className="not-found">
      <div className="title">Erreur 404</div>
      <div className="description-content">
        <img className="logo-image" src={logo} alt="Logo"></img>
        <div className="description-container">
          <p className="description">
            Oups, il semble que la page recherchée est introuvable... Vous pouvez rester un peu au coin du feu ou revenir à la page d'accueil.
          </p>
          <Link to="/" className="home-button">Accéder à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}

NotFound.proprTypes = {
  setCampgroundNotFound: PropTypes.func.isRequired
}

// == Export
export default NotFound;