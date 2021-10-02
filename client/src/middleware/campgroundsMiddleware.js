import axios from 'axios';

import { FETCH_CAMPGROUNDS, saveCampgrounds } from '../actions/campgrounds';

const campgroundsMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      axios.get('/api/campgrounds')
        .then((response) => {
          console.log(response);
          // we want to store response.data in the state
          store.dispatch(saveCampgrounds(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;