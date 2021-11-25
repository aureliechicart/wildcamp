import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

const Footer = () => (
  <footer className="footer">
    <p className="footer-description">2021 &#8211; Développé à des fins d'apprentissage</p>
    <Link className="footer-contact" to="mailto:aurelie.chicart@gmail.com">Contact</Link>
  </footer>
);

export default Footer;