import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import "./newcampgroundform.scss";
import Divider from '../../UI/Divider';

const NewCampgroundForm = ({
  title,
  image,
  description,
  country,
  changeField,
  submitCampground,
  campgroundId,
  loadingCampgroundId,
  errors,
  setNewCampgroundError
}) => {

  useEffect(() => {
    document.title = `wildcamp - Ajout d'un nouveau spot`;
  }, []);

  const history = useHistory();

  const routeChange = () => {
    history.goBack();
  }

  useEffect(() => {
    if (!loadingCampgroundId) {
      const path = `/campground/${campgroundId}`;
      history.push(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCampgroundId]);

  return (
    <div className="add-campground-form">
      <h2 className="heading">Ajouter un spot de camping sauvage</h2>
      <Divider />
      <div className="content" >
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            submitCampground();
          }}
        >
          <label htmlFor="title" className="label">
            Titre*:
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Saisissez un titre..."
              required
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                if (title.length === 0) {
                  setNewCampgroundError(event.target.name, "Le champ Titre est obligatoire");
                } else {
                  setNewCampgroundError(event.target.name, '');
                }
              }} />
            {errors.title &&
              <span className='error'>{errors.title}</span>}
          </label>
          <label htmlFor="image" className="label">
            URL de l'image* :
            <input
              type="url"
              value={image}
              name="image"
              placeholder="Saisissez l'URL d'une image..."
              required
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                if (image.length === 0) {
                  setNewCampgroundError(event.target.name, "Le champ URL de l'image est obligatoire");
                } else {
                  setNewCampgroundError(event.target.name, '');
                }
              }} />
            {errors.image &&
              <span className='error'>{errors.image}</span>}
          </label>
          <label htmlFor="description" className="label">
            Description*:
            <textarea
              value={description}
              name="description"
              placeholder="Décrivez le spot..."
              rows="4"
              required
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                if (description.length === 0) {
                  setNewCampgroundError(event.target.name, "Le champ Description est obligatoire");
                } else {
                  setNewCampgroundError(event.target.name, '');
                }
              }} />
            {errors.description &&
              <span className='error'>{errors.description}</span>}
          </label>
          <label htmlFor="country" className="label">
            Pays*:
            <input type="text"
              value={country}
              name="country"
              placeholder="Indiquez le pays où se trouve le spot..."
              required
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
              onBlur={(event) => {
                if (country.length === 0) {
                  setNewCampgroundError(event.target.name, "Le champ Pays est obligatoire");
                } else {
                  setNewCampgroundError(event.target.name, '');
                }
              }} />
            {errors.country &&
              <span className='error'>{errors.country}</span>}
          </label>

          <div className="actions">
            <input
              type="button"
              value="Annuler"
              title="Revenir à la page précédente"
              onClick={routeChange}
            />
            <input
              type="submit"
              value="Valider"
            />
          </div>
        </form>
      </div>
    </div>
  )
};

NewCampgroundForm.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  submitCampground: PropTypes.func.isRequired,
  campgroundId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  loadingCampgroundId: PropTypes.bool.isRequired
};

export default withRouter(NewCampgroundForm);