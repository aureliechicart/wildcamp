import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { validate } from 'react-email-validator';

import "./signup.scss";
import Divider from '../../UI/Divider';

const SignupForm = ({
  email,
  username,
  password,
  passwordConfirm,
  changeField,
  submitNewUser,
  setError,
  setIsFormValid,
  isFormValid,
  clearValidity,
  isFormSubmitted,
  apiErrorMessage
}) => {

  useEffect(() => {
    document.title = `wildcamp - Création de compte`;
  }, []);

  // Redirect for cancel button
  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  }

  // Redirect when form is successfully submitted
  useEffect(() => {
    if (isFormSubmitted) {
      history.push('/login');
    }
  });

  // Field validation
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

      case 'username':
        if (username.val === '') {
          setIsFormValid(false);
          setError('username', `Le champ Pseudo est obligatoire`);
        }
        break;

      case 'password':
        if (password.val === '') {
          setIsFormValid(false);
          setError('password', `Le champ Mot de passe est obligatoire`);
        } else if (password.val.length < 6) {
          setIsFormValid(false);
          setError('password', `Le mot de passe doit être composé d'au moins 6 caractères`);
        }
        break;

      case 'passwordConfirm':
        if (passwordConfirm.val === '') {
          setIsFormValid(false);
          setError('passwordConfirm', `Le champ Confirmation du mot de passe est obligatoire`);
        } else if (passwordConfirm.val !== password.val) {
          setIsFormValid(false);
          setError('passwordConfirm', `Les deux mots de passe ne coïncident pas. Veuillez vérifier votre saisie`);
        }
        break;

      default:
        return;
    }
  }


  return (
    <div className="signup-form">
      <h2 className="heading">Création de compte</h2>
      <Divider />
      <div className="content" >
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isFormValid) {
              return;
            }
            submitNewUser();
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
          <label htmlFor="username" className="label">
            Pseudo*&nbsp;:
            <input
              required
              type="text"
              value={username.val}
              name="username"
              placeholder="Le pseudo que vous souhaitez utiliser..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                clearValidity(event.target.name);
                validateField(event.target.name);
              }}
            />
            {!!username.error &&
              <span className='error'>{username.error}</span>
            }
          </label>
          <label htmlFor="password" className="label">
            Mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={password.val}
              name="password"
              placeholder="Mot de passe de plus de 5 caractères..."
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
          <label htmlFor="passwordConfirm" className="label">
            Confirmation du mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={passwordConfirm.val}
              name="passwordConfirm"
              placeholder="Confirmez le mot de passe..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                clearValidity(event.target.name);
                validateField(event.target.name);
              }}
            />
            {!!passwordConfirm.error &&
              <span className='error'>{passwordConfirm.error}</span>
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
              value="S'inscrire"
              title="S'inscrire"
            />
          </div>
        </form>
        <Divider />
        <div className="has-account">
          <p className="has-account-text">Vous possédez déjà un compte&nbsp;?<br /> Cliquez ci-dessous pour vous connecter&nbsp;!
          </p>
          <Link className="login-button" to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  )
};

SignupForm.propTypes = {
  email: PropTypes.shape({
    val: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  username: PropTypes.PropTypes.shape({
    val: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  password: PropTypes.PropTypes.shape({
    val: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  passwordConfirm: PropTypes.PropTypes.shape({
    val: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  changeField: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  clearValidity: PropTypes.func.isRequired,
  isFormSubmitted: PropTypes.bool.isRequired,
};

export default SignupForm;