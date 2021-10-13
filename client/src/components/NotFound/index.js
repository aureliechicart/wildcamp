import React from 'react';
import { Link } from 'react-router-dom';

// == Import
import './notfound.scss';
import logo from '../Navbar/logo.png';

// == Component
const NotFound = () => (
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

// == Export
export default NotFound;