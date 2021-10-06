import {
  UPDATE_CAMPGROUND_FIELD,
  SAVE_CAMPGROUND_ID,
  TOGGLE_LOADING_CAMPGROUND_ID
} from '../actions/newCampground'

const initialState = {
  title: '',
  image: '',
  description: '',
  country: '',
  campgroundId: '',
  loadingCampgroundId: true,
};

function newCampgroundReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CAMPGROUND_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };

    case SAVE_CAMPGROUND_ID:
      return {
        ...state,
        campgroundId: action.campgroundId,
        // now the campground is created, we can reset the inputs
        title: '',
        image: '',
        description: '',
        country: ''
      };

    case TOGGLE_LOADING_CAMPGROUND_ID:
      return {
        ...state,
        loadingCampgroundId: !state.loadingCampgroundId,
      }

    default:
      return state;
  }
}

export default newCampgroundReducer;