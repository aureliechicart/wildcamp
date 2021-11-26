import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

import logo from "./logo.png";
import "./navbar.scss";

const Navbar = ({
  isAuthenticated,
  submitLogout,
  loggedInUser,
  setBannerDisplay
}) => (
  <nav className="nav">
    <div className="nav-container">
      <NavLink
        to="/"
        className="nav-logo"
        exact
      >
        <img className="nav-logo-image" src={logo} alt="Logo"></img>
        <div className="nav-brand">Wildcamp</div>
      </NavLink>
      <div className="nav-items">
        {isAuthenticated
          ?
          <div className="nav-items loggedin">
            <span className="nav-item username">
            {loggedInUser.username}
            </span>
            <div
              onClick={() => {
                submitLogout();
                setBannerDisplay(false);
              }}
              className="nav-item"
            > Déconnexion
            </div>
          </div>
          :
          <div className="nav-items loggedout">
            <NavLink
              to="/signup"
              className="nav-item"
              activeClassName="nav-item-active"
            >
              Inscription
            </NavLink>
            <NavLink
              to="/login"
              className="nav-item"
              activeClassName="nav-item-active"
            > Connexion
            </NavLink>
          </div>
        }

      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  submitLogout: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    username: PropTypes.string
  }),
  setBannerDisplay: PropTypes.func.isRequired
}

export default Navbar;
