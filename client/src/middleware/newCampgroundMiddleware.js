import axios from 'axios';

import {
  SUBMIT_CAMPGROUND,
  saveCampgroundId,
  toggleLoadingCampgroundId,
  SUBMIT_EDITED_CAMPGROUND
} from '../actions/newCampground';

const newCampgroundMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_CAMPGROUND:
      // we post the new campground using the information in state
      axios.post('/api/campgrounds', {
        title: store.getState().campgrounds.title,
        image: store.getState().campgrounds.image,
        description: store.getState().campgrounds.description,
        country: store.getState().campgrounds.country,
        // user_id hard-coded for now
        user_id: 1
      })
        .then((response) => {
          // once we get the id of the new campground from the database
          // we save it in state
          store.dispatch(saveCampgroundId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          // once the request is finished, we toggle the boolean
          // which represents if campground id is available
          store.dispatch(toggleLoadingCampgroundId());
        });
      break;

    case SUBMIT_EDITED_CAMPGROUND:
      // we send a put request using the information in state
      axios.put(`/api/campgrounds/${action.campgroundId}`, {
        title: store.getState().campgrounds.selectedCampground.title,
        image: store.getState().campgrounds.selectedCampground.image,
        description: store.getState().campgrounds.selectedCampground.description,
        country: store.getState().campgrounds.selectedCampground.country,
        // user_id: only the user who posted this record can change it
        // this means the user_id won't change and is not relevant here
      })
        .then((response) => {
          // once we get the id of the new campground from the database
          // we save it in state
          store.dispatch(saveCampgroundId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          // once the request is finished, we toggle the boolean
          // which represents if campground id is available
          store.dispatch(toggleLoadingCampgroundId());
        });
      break;

    default:
  }

  next(action);
};

export default newCampgroundMiddleware;