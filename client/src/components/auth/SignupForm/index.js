import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import PropTypes from 'prop-types';

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
  isUserCreated,
  setIsUserCreated,
  errors,
  setError
}) => {

  useEffect(() => {
    document.title = `wildcamp - Création de compte`;
  }, []);

  useEffect(() => {
    setIsUserCreated(false);
  }, [setIsUserCreated]);

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


  return (
    <div className="signup-form">
      <h2 className="heading">Création de compte</h2>
      <Divider />
      <div className="content" >
        {isUserCreated && (
          <div className="message">Vous êtes bien inscrit. Veuillez vous <Link className="message-link" to="/login">connecter</Link>
          </div>
        )}
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
                const isEmailValid = validate(email);
                if (!isEmailValid) {
                  setError(event.target.name, "L'adresse email n'est pas valide");
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
            />
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
      </div>
    </div>
  )
};

SignupForm.propTypes = {
};

export default SignupForm;