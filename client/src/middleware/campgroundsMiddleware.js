import axios from 'axios';

import { FETCH_CAMPGROUNDS, FETCH_SELECTED_CAMPGROUND, saveCampgrounds, saveSelectedCampground, saveAuthor, saveComments, toggleLoadingCampgrounds, toggleLoadingSelectedCampground } from '../actions/campgrounds';

const campgroundsMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      axios.get('/api/campgrounds')
        .then((response) => {
          // we want to store response.data in the state
          store.dispatch(saveCampgrounds(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(toggleLoadingCampgrounds());
        });
      break;

    case FETCH_SELECTED_CAMPGROUND:
      axios.get(`/api/campgrounds/${action.id}`)
        .then((firstResponse) => {
          console.log(firstResponse.data);
          console.log(`/api/campgrounds/${action.id}`);
          store.dispatch(saveSelectedCampground(firstResponse.data));
          return axios.get(`/api/users/${firstResponse.data.user_id}`);
        })
        .then((secondResponse) => {
          console.log(secondResponse.data.username);
          store.dispatch(saveAuthor(secondResponse.data.username));
          return axios.get(`/api/campgrounds/${action.id}/comments`);
        })
        .then((thirdResponse) => {
          console.log(thirdResponse.data);
          if (thirdResponse.data) {
            store.dispatch(saveComments(thirdResponse.data));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(toggleLoadingSelectedCampground());
        });
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;