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
  errors,
  setError,
  isFormSubmitted
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

  // Form validation
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
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
            if (validateForm(errors)) {
              submitNewUser();
            } else {
              console.error('Invalid Form');
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
              }}
              onBlur={(event) => {
                const isEmailValid = validate(email);
                if (!isEmailValid) {
                  setError(event.target.name, "L'adresse email n'est pas valide. Veuillez vérifier votre saisie");
                } else {
                  setError(event.target.name, '');
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
          <label htmlFor="username" className="label">
            Pseudo*&nbsp;:
            <input
              required
              type="text"
              value={username}
              name="username"
              placeholder="Le pseudo que vous souhaitez utiliser..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                if (username.length === 0) {
                  setError(event.target.name, "Le champ Pseudo est requis");
                } else {
                  setError(event.target.name, '');
                }
              }}
            />
            {errors.username &&
              <span className='error'>{errors.username}</span>
            }
          </label>
          <label htmlFor="password" className="label">
            Mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="Mot de passe de plus de 5 caractères..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
                if (password.length < 5) {
                  setError(event.target.name, "Le mot de passe doit contenir au minimum 5 caractères");
                } else {
                  setError(event.target.name, '');
                }
              }}
            />
            {errors.password.length > 0 &&
              <span className='error'>{errors.password}</span>}
          </label>
          <label htmlFor="passwordConfirm" className="label">
            Confirmation du mot de passe*&nbsp;:
            <input
              required
              type="password"
              value={passwordConfirm}
              name="passwordConfirm"
              placeholder="Confirmez le mot de passe..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
            />
            {errors.passwordDiffer &&
              <span className='error'>Les deux mots de passe ne coïncident pas. Veuillez vérifier votre saisie</span>
            }
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
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired
};

export default SignupForm;