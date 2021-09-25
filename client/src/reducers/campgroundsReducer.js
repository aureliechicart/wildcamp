import data from '../data';

const initialState = {
  campgroundsList: data,
};

function campgroundsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default campgroundsReducer;