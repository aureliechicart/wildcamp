import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import campgroundsMiddleware from '../middleware/campgroundsMiddleware';
import signupMiddleware from '../middleware/signupMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import currentCampgroundMiddleware from '../middleware/currentCampgroundMiddleware';
import newCampgroundMiddleware from '../middleware/newCampgroundMiddleware';

// combineReducers => we import the combined reducer
import reducer from '../reducers';

// we combine devTools with the middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    campgroundsMiddleware,
    signupMiddleware,
    authMiddleware,
    currentCampgroundMiddleware,
    newCampgroundMiddleware,
    // ... other middleware
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;