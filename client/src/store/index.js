import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import campgroundsMiddleware from '../middleware/campgroundsMiddleware';

// combineReducers => we import the combined reducer
import reducer from '../reducers';

// we combine devTools with the middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    campgroundsMiddleware,
    // ... d'autres middlewares
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;