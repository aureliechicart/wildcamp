import React from "react";
import PropTypes from 'prop-types';

import "./campgroundform.scss";

const CampgroundForm = ({ title, image, description, country, changeField }) => {
  // console.log(title);

  return (
    <div className="campground-form">
      <h2 className="heading">Ajouter un spot de camping sauvage</h2>
      <div className="content" >
        <form className="form">
          <label className="label">
            Titre* :
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Saisissez un titre..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
          <label className="label">
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
          <label className="label">
            Description* :
            <textarea
              value={description}
              name="description"
              placeholder="Décrivez le spot..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
            />
          </label>
          <label className="label">
            Pays* :
            <input type="text"
              value={country}
              name="country"
              placeholder="Indiquez le pays où se trouve le spot..."
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
        </form>
      </div>
      <div className="actions">
        <input type="submit" value="Annuler" />
        <input type="submit" value="Valider" />
      </div>
    </div>
  )
};

CampgroundForm.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired
};

export default CampgroundForm;