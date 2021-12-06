import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import logo from "./logo.png";
import "./navbar.scss";

const Navbar = ({
  isAuthenticated,
  submitLogout,
  loggedInUser,
  setBannerDisplay,
  setIsAuthenticated
}) => {
  const history = useHistory();

  return (
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
              <FontAwesomeIcon
                icon={faUser}
                className="user-icon"
              />
                {loggedInUser.username}
              </span>
              <div
                onClick={() => {
                  submitLogout();
                  setBannerDisplay(false);
                  setIsAuthenticated(false);
                  history.push("/login");
                }}
                className="nav-item"
              ><FontAwesomeIcon
                  icon={faPowerOff}
                  className="power-off-icon"
                />
                Déconnexion
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
  )
};

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
