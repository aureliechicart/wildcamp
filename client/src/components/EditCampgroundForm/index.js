import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';


import "./editcampgroundform.scss";
import Divider from '../Divider';

const EditCampgroundForm = ({
  loadSelectedCampground,
  selectedCampground,
  changeField,
  submitEditedCampground,
  // state info returned after submitting edited campground
  loadingCampgroundId
}) => {
  const { id } = useParams();

  const history = useHistory();
  const routeChange = () => {
    const path = `/campground/${selectedCampground.id}`;
    history.push(path);
  }
  useEffect(() => {
    loadSelectedCampground(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!loadingCampgroundId) {
      const path = `/campground/${id}`;
      history.push(path);
    }
  });


  return (
    <div className="edit-campground-form">
      <h2 className="heading">Modifier les informations sur le spot</h2>
      <Divider />
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
              type="url"
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
              rows="4"
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
              title="Revenir au spot"
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
  loadSelectedCampground: PropTypes.func.isRequired,
  selectedCampground: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
  }),
  changeField: PropTypes.func.isRequired,
  submitEditedCamgpround: PropTypes.func,
  loadingCampgroundId: PropTypes.bool.isRequired
};

export default EditCampgroundForm;