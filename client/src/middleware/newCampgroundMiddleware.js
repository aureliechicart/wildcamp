import axios from 'axios';

import {
  SUBMIT_CAMPGROUND,
  saveCampgroundId,
  toggleLoadingCampgroundId
 } from '../actions/newCampground';

const newCampgroundMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
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

export default newCampgroundMiddleware;