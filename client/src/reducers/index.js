import { combineReducers } from 'redux';

// importing reducers
import campgroundsReducer from './campgroundsReducer';
import newCampgroundReducer from './newCampgroundReducer';

// this is the main reducer, which combines all the other reducers
// combineReducers takes as argument an object which describes
// the different "drawers"  of the state and which reducer reducer controls
// each drawer
const rootReducer = combineReducers({
  // drawer name: reducer which controls this part of the state
  campgrounds: campgroundsReducer,
  newCampground: newCampgroundReducer,
});

export default rootReducer;