// import { NavLink } from 'react-router-dom';
import logo from './logo.png';

import './navbar.scss';

const Navbar = () => (
  <nav className="nav">
    <div className="nav-container">
      <a href="/" className="nav-logo">
        <img className= "nav-logo-image" src={logo} alt="Logo"></img>
        <div className="nav-brand">Wildcamp</div>
      </a>
      <div className="nav-items">
      <a className="nav-item" href="/login">Connexion</a>
      <a className="nav-item" href="/signup">Inscription</a>
      </div>
    </div>
  </nav>
);

export default Navbar;