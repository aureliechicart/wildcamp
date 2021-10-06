import axios from 'axios';

import {
  FETCH_CAMPGROUNDS,
  FETCH_SELECTED_CAMPGROUND,
  saveCampgrounds,
  saveSelectedCampground,
  saveAuthor,
  saveComments,
  toggleLoadingCampgrounds,
  toggleLoadingSelectedCampground,
  SUBMIT_CAMPGROUND,
  saveCampgroundId,
  toggleLoadingCampgroundId
 } from '../actions/campgrounds';

const campgroundsMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      axios.get('/api/campgrounds')
        .then((response) => {
          // we want to store response.data in the state
          store.dispatch(saveCampgrounds(response.data));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(toggleLoadingCampgrounds());
        });
      break;

    case FETCH_SELECTED_CAMPGROUND:
      axios.get(`/api/campgrounds/${action.id}`)
        .then((firstResponse) => {
          store.dispatch(saveSelectedCampground(firstResponse.data));
          return axios.get(`/api/users/${firstResponse.data.user_id}`);
        })
        .then((secondResponse) => {
          store.dispatch(saveAuthor(secondResponse.data.username));
          return axios.get(`/api/campgrounds/${action.id}/comments`);
        })
        .then((thirdResponse) => {
          if (thirdResponse.data) {
            store.dispatch(saveComments(thirdResponse.data));
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(toggleLoadingSelectedCampground());
        });
      break;

      case SUBMIT_CAMPGROUND:
        axios.post('/api/campgrounds', {
        title: store.getState().campgrounds.title,
        image: store.getState().campgrounds.image,
        description: store.getState().campgrounds.description,
        country: store.getState().campgrounds.country,
        // user_id hard-coded for now
        user_id: 1
      })
        .then((response) => {
          store.dispatch(saveCampgroundId(response.data.id)); 
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(()=> {
          store.dispatch(toggleLoadingCampgroundId());
        });
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;