import {
  SAVE_CAMPGROUNDS,
  TOGGLE_LOADING_CAMPGROUNDS,
  UPDATE_CAMPGROUNDS_AFTER_DELETE
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

      case UPDATE_CAMPGROUNDS_AFTER_DELETE:
        return {
          ...state,
          // following deletion of a campground, we update the campground list in state
          campgroundsList: state.campgroundsList.filter(campground => 
            campground.id !== action.campgroundId
          )
        }

    default:
      return state;
  }
}

export default campgroundsReducer;