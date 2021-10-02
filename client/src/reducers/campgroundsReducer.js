import { SAVE_CAMPGROUNDS, SAVE_SELECTED_CAMPGROUND, SAVE_AUTHOR, SAVE_COMMENTS } from '../actions/campgrounds'

const initialState = {
  campgroundsList: [],
  selectedCampground: {},
  author: '',
  comments: []
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

    default:
      return state;
  }
}

export default campgroundsReducer;