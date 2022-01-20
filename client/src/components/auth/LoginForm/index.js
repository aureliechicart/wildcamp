import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { validate } from 'react-email-validator';

import "./loginform.scss";
import Divider from '../../UI/Divider';

const LoginForm = ({
  email,
  password,
  changeField,
  submitLogin,
  setError,
  setIsFormValid,
  isFormValid,
  clearValidity,
  apiErrorMessage,
  isAuthenticated
}) => {

  useEffect(() => {
    document.title = `wildcamp - Connexion`;
  }, []);

  // Redirect for cancel button
  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  }

  // New field validation
  const validateField = (fieldName) => {
    setIsFormValid(true);
    switch (fieldName) {
      case 'email':
        if (email.val === '') {
          setIsFormValid(false);
          setError('email', 'Le champ Adresse email est obligatoire');
        } else if (!validate(email.val)) {
          setIsFormValid(false);
          setError('email', `Le format de l'email n'est pas valide. Veuillez vérifier votre saisie`);
        }
        break;

      case 'password':
        if (password.val === '') {
          setIsFormValid(false);
          setError('password', `Le champ Mot de passe est obligatoire`);
        } else if (password.val.length < 5) {
          setIsFormValid(false);
          setError('password', `Le mot de passe doit être composé d'au moins 5 caractères`);
        }
        break;

      default:
        return;
    }
  }


  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);


  return (
    <div className="login-form">
      <h2 className="heading">Connexion</h2>
      <h3 className="description">Identifiez-vous pour pouvoir ajouter des spots et commenter&nbsp;!</h3>
      <Divider />
      <div className="content">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isFormValid) {
              return;
            }
            submitLogin();
          }}
        >
          <label htmlFor="email" className="label">
            Adresse email*&nbsp;:
            <input
              required
              type="text"
              value={email.val}
              name="email"
              placeholder="Votre adresse email..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                clearValidity(event.target.name);
                validateField(event.target.name);
              }}
            />
            {!!email.error &&
              <span className='error'>{email.error}</span>
            }
          </label>
          <label htmlFor="password" className="label">
            Mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={password.val}
              name="password"
              placeholder="Votre mot de passe..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                clearValidity(event.target.name);
                validateField(event.target.name);
              }}
            />
            {!!password.error &&
              <span className='error'>{password.error}</span>
            }
          </label>

          {!!apiErrorMessage &&
            <p className="api-error">{apiErrorMessage}</p>
          }

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
        <Divider />
        <div className="no-account">
          <p className="no-account-text">Vous n'avez pas encore de compte&nbsp;?<br /> Cliquez ci-dessous pour vous inscrire&nbsp;!
          </p>
          <Link className="signup-button" to="/signup">Créer un compte</Link>
        </div>

      </div>
    </div>
  )
};

LoginForm.propTypes = {
  // email: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default LoginForm;