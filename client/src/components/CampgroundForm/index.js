import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import "./campgroundform.scss";

const CampgroundForm = ({
  title,
  image,
  description,
  country,
  changeField,
  submitCampground,
  campgroundId,
  loadingCampgroundId
}) => {

  const history = useHistory();
  const routeChange = () => {
    const path = `/`;
    history.push(path);
  }

  useEffect(() => {
    if (!loadingCampgroundId) {
      const path = `/campground/${campgroundId}`;
      history.push(path);
    }
  });

  return (
    <div className="campground-form">
      <h2 className="heading">Ajouter un spot de camping sauvage</h2>
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
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
          <label htmlFor="image" className="label">
            URL de l'image* :
            <input
              type="text"
              value={image}
              name="image"
              placeholder="Saisissez l'URL d'une image..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
          <label htmlFor="description" className="label">
            Description*:
            <textarea
              value={description}
              name="description"
              placeholder="Décrivez le spot..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
            />
          </label>
          <label htmlFor="country" className="label">
            Pays*:
            <input type="text"
              value={country}
              name="country"
              placeholder="Indiquez le pays où se trouve le spot..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>

          <div className="actions">
            <input
              type="button"
              value="Annuler"
              title="Revenir à la page d'accueil"
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

CampgroundForm.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  // submitCamgpround: PropTypes.func.isRequired
};

export default CampgroundForm;