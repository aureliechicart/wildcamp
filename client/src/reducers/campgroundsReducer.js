import {
  SAVE_CAMPGROUNDS,
  SAVE_SELECTED_CAMPGROUND,
  SAVE_AUTHOR,
  SAVE_COMMENTS,
  TOGGLE_LOADING_CAMPGROUNDS,
  TOGGLE_SELECTED_LOADING_CAMPGROUND,
  UPDATE_CAMPGROUND_FIELD,
  SAVE_CAMPGROUND_ID,
  TOGGLE_LOADING_CAMPGROUND_ID
} from '../actions/campgrounds'

const initialState = {
  campgroundsList: [],
  selectedCampground: {},
  author: '',
  comments: [],
  loadingCampgrounds: true,
  loadingSelectedCampground: true,
  title: '',
  image: '',
  description: '',
  country: '',
  campgroundId: '',
  loadingCampgroundId: true,
};

function campgroundsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CAMPGROUNDS:
      return {
        ...state,
        campgroundsList: action.campgrounds,
      };

    case SAVE_SELECTED_CAMPGROUND:
      return {
        ...state,
        selectedCampground: action.selectedCampground,
      };

    case SAVE_AUTHOR:
      return {
        ...state,
        author: action.author,
      };

    case SAVE_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case TOGGLE_LOADING_CAMPGROUNDS:
      return {
        ...state,
        loadingCampgrounds: !state.loadingCampgrounds,
      };

    case TOGGLE_SELECTED_LOADING_CAMPGROUND:
      return {
        ...state,
        loadingSelectedCampground: !state.loadingSelectedCampground,
      };

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

export default campgroundsReducer;