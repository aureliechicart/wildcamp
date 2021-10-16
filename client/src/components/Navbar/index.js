import React from "react";
import { NavLink } from "react-router-dom";

import logo from "./logo.png";
import "./navbar.scss";

const Navbar = () => (
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
        >
          Connexion
        </NavLink>

      </div>
    </div>
  </nav>
);

export default Navbar;
