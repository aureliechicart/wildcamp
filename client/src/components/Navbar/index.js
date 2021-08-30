// import { NavLink } from 'react-router-dom';
import logo from './logo.png';

import './navbar.scss';

const Navbar = () => (
  <nav className="nav">
    <div className="nav-container">
      <a href="/">
        <img className= "nav-logo" src={logo} alt="Logo"></img>
      </a>
      <a className="nav-item" href="/">Accueil</a>
      <a className="nav-item" href="/login">Connexion</a>
      <a className="nav-item" href="/signup">Inscription</a>
    </div>
  </nav>
);

export default Navbar;