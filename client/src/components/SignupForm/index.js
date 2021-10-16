import React from "react";
import { useHistory } from "react-router-dom";
// import PropTypes from 'prop-types';

import "./signup.scss";

const SignupForm = () => {

  // Redirect for cancel button
  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  }
  

  return (
    <div className="signup-form">
      <h2 className="heading">Inscrivez-vous pour partager des spots de camping sauvage</h2>
      <div className="content" >
        <form
          className="form"
        >
          <label htmlFor="email" className="label">
            Adresse email*:
            <input
              type="email"
              value=""
              name="email"
              />
          </label>
          <label htmlFor="username" className="label">
            Pseudo* :
            <input
              type="text"
              value=""
              name="username"/>
          </label>
          <label htmlFor="password" className="label">
            Mot de passe*:
            <input
              type="text"
              value=""
              name="password"
            />
          </label>
          <label htmlFor="passwordConfirm" className="label">
            Confirmation du mot de passe*:
            <input
              type="text"
              value=""
              name="passwordConfirm"
              />
          </label>

          <div className="actions">
            <input
              type="button"
              value="Annuler"
              title="Revenir à l'accueil"
              onClick={routeChange}
            />
            <input
              type="submit"
              value="S'inscrire"
              title="S'inscrire"
            />
          </div>
        </form>
      </div>
    </div>
  )
};

SignupForm.propTypes = {
};

export default SignupForm;