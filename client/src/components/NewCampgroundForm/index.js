import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import "./newcampgroundform.scss";
import Divider from '../Divider';

const NewCampgroundForm = ({
  title,
  image,
  description,
  country,
  changeField,
  submitCampground,
  campgroundId,
  loadingCampgroundId
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
              rows="4"
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
  // submitCamgpround: PropTypes.func.isRequired
};

export default NewCampgroundForm;