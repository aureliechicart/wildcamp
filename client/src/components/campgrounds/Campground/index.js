import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';

import "./campground.scss";

import Comments from '../../../containers/Comments';
import Spinner from '../../UI/Spinner';
import Divider from '../../UI/Divider';

const Campground = ({
  loadingSelectedCampground,
  selectedCampground,
  loadSelectedCampground,
  author,
  deleteCampground,
  campgroundNotFound,
  errors,
  clearAddCamgroundForm,
  clearSelectedCampground,
  isAuthenticated,
  loggedInUser
}) => {
  const { id } = useParams();

  const history = useHistory();
  const editRouteChange = () => {
    const path = `/edit-campground/${selectedCampground.id}`;
    history.push(path);
  }

  useEffect(() => {
    document.title = `wildcamp - ${selectedCampground.title}`;
  });

  // if the id in params of the url changes, we load the corresponding
  // campground from db and we update document title
  useEffect(() => {
    loadSelectedCampground(parseInt(id), 10);
    document.title = `wildcamp - ${selectedCampground.title}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (campgroundNotFound) {
      history.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campgroundNotFound]);


  return (
    <main className="main">
      <div className="campground">
        <h1 className="campground-heading">Spot Wildcamp</h1>
        <Divider />
        {loadingSelectedCampground && <Spinner />}

        {!loadingSelectedCampground && (
          <div>
            <div className="campground-thumbnail">
              <img
                className="campground-image"
                src={selectedCampground.image}
                alt="Spot de camping sauvage"
              />
              <div className="campground-details">
                <div className="campground-details-main">
                  <h2 className="campground-details-title">{selectedCampground.title}</h2>
                  <span className="campground-details-country">{selectedCampground.country}</span>
                </div>

                <p className="campground-details-description">
                  {selectedCampground.description}
                </p>
                <div className="campground-details-commands">
                  <p className="author">
                    Partagé par : <span className="author-name">{author}</span>
                  </p>

                  {isAuthenticated && (loggedInUser.id === selectedCampground.user_id) && (
                    <div className="button-group">
                      <button
                        className="edit-button"
                        onClick={editRouteChange}
                      >
                        Modifier
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          deleteCampground(id);
                          clearSelectedCampground();
                          history.push('/');
                        }}
                      >
                        Supprimer
                      </button>
                    </div>

                  )}
                </div>
                {errors.notAuthor &&
                  <div className="error">Suppression impossible : seul l'auteur de cette publication peut la supprimer</div>
                }
              </div>
            </div>
            <Comments />
          </div>
        )}
      </div>

      <Divider />

      <div className="buttons-container">
        {isAuthenticated &&
          <button
            className="button"
            onClick={() => {
              clearAddCamgroundForm();
              history.push('/new-campground');
            }}
          >
            Ajouter un nouveau spot
          </button>
        }
        <Link
          to="/"
          className="button"
        >
          Revenir à l'accueil
        </Link>
      </div>

    </main>
  );
}

Campground.propTypes = {
  loadingSelectedCampground: PropTypes.bool.isRequired,
  selectedCampground: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    user_id: PropTypes.number,
  }),
  loadSelectedCampground: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  deleteCampground: PropTypes.func.isRequired,
  campgroundNotFound: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  clearAddCamgroundForm: PropTypes.func.isRequired,
  clearSelectedCampground: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    username: PropTypes.string
  })
};

export default Campground;
