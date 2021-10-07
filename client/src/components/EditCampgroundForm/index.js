import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import "./editcampgroundform.scss";

const EditCampgroundForm = ({
  selectedCampground,
  changeField,
  submitEditedCampground,
  campgroundId,
  loadingCampgroundId
}) => {

  const history = useHistory();
  const routeChange = () => {
    const path = `/campground/${selectedCampground.id}`;
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
      <h2 className="heading">Modifier les informations sur le spot</h2>
      <div className="content" >
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            submitEditedCampground(selectedCampground.id);
          }}
        >
          <label htmlFor="title" className="label">
            Titre*:
            <input
              type="text"
              value={selectedCampground.title}
              name="title"
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
          <label htmlFor="image" className="label">
            URL de l'image* :
            <input
              type="text"
              value={selectedCampground.image}
              name="image"
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }} />
          </label>
          <label htmlFor="description" className="label">
            Description*:
            <textarea
              value={selectedCampground.description}
              name="description"
              onChange={(event) => {
                changeField(event.target.value, event.target.name);
              }}
            />
          </label>
          <label htmlFor="country" className="label">
            Pays*:
            <input type="text"
              value={selectedCampground.country}
              name="country"
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
              value="Enregistrer"
              title="Enregistrer les modifications"
            />
          </div>
        </form>
      </div>
    </div>
  )
};

EditCampgroundForm.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  // submitCamgpround: PropTypes.func.isRequired
};

export default EditCampgroundForm;