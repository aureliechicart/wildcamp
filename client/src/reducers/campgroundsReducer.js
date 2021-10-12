import {
  SAVE_CAMPGROUNDS,
  TOGGLE_LOADING_CAMPGROUNDS,
} from '../actions/campgrounds'

const initialState = {
  campgroundsList: [],
  loadingCampgrounds: true,
};

function campgroundsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CAMPGROUNDS:
      return {
        ...state,
        campgroundsList: action.campgrounds,
      };

    case TOGGLE_LOADING_CAMPGROUNDS:
      return {
        ...state,
        loadingCampgrounds: !state.loadingCampgrounds,
      };

    default:
      return state;
  }
}

export default campgroundsReducer;