import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import PropTypes from 'prop-types';

import { validate } from 'react-email-validator';

import "./loginform.scss";

const LoginForm = ({
  email,
  password,
  errors,
  changeField,
  submitLogin,
  setLoginError,
  isLoggedIn
}) => {


  // Redirect for cancel button
  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  }

  // Form validation
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);


  return (
    <div className="login-form">
      <h2 className="heading">Connexion à votre compte</h2>
      <div className="content">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (validateForm(errors)) {
              console.info('Valid Form');
              submitLogin();
            } else {
              console.error('Invalid Form')
            }
          }}
        >
          <label htmlFor="email" className="label">
            Adresse email*&nbsp;:
            <input
              required
              type="text"
              value={email}
              name="email"
              placeholder="Votre adresse email..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
                const isEmailValid = validate(email);
                if (!isEmailValid) {
                  setLoginError(event.target.name, "L'adresse email n'est pas valide");
                } else {
                  setLoginError(event.target.name, '');
                }
              }}
            />
            {errors.email.length > 0 &&
              <span className='error'>{errors.email}</span>
            }
            {errors.alreadyRegistered &&
              <span className='error'>Un utilisateur possédant cette adresse email est déjà enregistré</span>
            }
          </label>
          <label htmlFor="password" className="label">
            Mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="Votre mot de passe..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
                if (password.length < 5) {
                  setLoginError(event.target.name, "Le mot de passe doit contenir au minimum 5 caractères");
                } else {
                  setLoginError(event.target.name, '');
                }
              }}
            />
            {errors.password.length > 0 &&
              <span className='error'>{errors.password}</span>}
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
              value="Se connecter"
              title="Se connecter"
            />
          </div>
        </form>

        <div className="no-account">
          <p className="no-account-text">Vous n'avez pas encore de compte ?<br /> Cliquez ci-dessous pour vous inscrire&nbsp;!
          </p>
          <Link className="signup-button" to="/signup">Créer un compte</Link>
        </div>

      </div>
    </div>
  )
};

LoginForm.propTypes = {
};

export default LoginForm;