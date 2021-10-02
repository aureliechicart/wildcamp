import { SAVE_CAMPGROUNDS } from '../actions/campgrounds'

const initialState = {
  campgroundsList: [],
};

function campgroundsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CAMPGROUNDS:
      return {
        ...state,
        campgroundsList: action.campgrounds,
      }

    default:
      return state;
  }
}

export default campgroundsReducer;