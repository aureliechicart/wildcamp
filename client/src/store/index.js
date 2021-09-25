import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// combineReducers => we import the combined reducer
import reducer from '../reducers';

const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);

export default store;