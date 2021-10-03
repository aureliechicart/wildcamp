import {
  SAVE_CAMPGROUNDS,
  SAVE_SELECTED_CAMPGROUND,
  SAVE_AUTHOR,
  SAVE_COMMENTS,
  TOGGLE_LOADING_CAMPGROUNDS,
  TOGGLE_SELECTED_LOADING_CAMPGROUND
 } from '../actions/campgrounds'

const initialState = {
  campgroundsList: [],
  selectedCampground: {},
  author: '',
  comments: [],
  loadingCampgrounds: true,
  loadingSelectedCampground: true,
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

    default:
      return state;
  }
}

export default campgroundsReducer;