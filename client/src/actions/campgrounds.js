// === action types
export const FETCH_CAMPGROUNDS = 'FETCH_CAMPGROUNDS';
export const SAVE_CAMPGROUNDS = 'SAVE_CAMPGROUNDS';

export const FETCH_SELECTED_CAMPGROUND = 'FETCH_SELECTED_CAMPGROUND';
export const SAVE_SELECTED_CAMPGROUND = 'SAVE_SELECTED_CAMPGROUND';

export const SAVE_AUTHOR = 'SAVE_AUTHOR';
export const SAVE_COMMENTS = 'SAVE_COMMENTS';

export const TOGGLE_LOADING_CAMPGROUNDS = 'TOGGLE_LOADING_CAMPGROUNDS';
export const TOGGLE_LOADING_SELECTED_CAMPGROUND = 'TOGGLE_LOADING_SELECTED_CAMPGROUND';

export const UPDATE_EDIT_FIELD = 'UPDATE_EDIT_FIELD';

// === action creators
export const fetchCampgrounds = () => ({
  type: FETCH_CAMPGROUNDS,
});

export const saveCampgrounds = (campgrounds) => ({
  type: SAVE_CAMPGROUNDS,
  campgrounds: campgrounds,
});

export const fetchSelectedCampground = (id) => ({
  type: FETCH_SELECTED_CAMPGROUND,
  id: id,
});

export const saveSelectedCampground = (selectedCampground) => ({
  type: SAVE_SELECTED_CAMPGROUND,
  selectedCampground: selectedCampground,
});

export const saveAuthor = (author) => ({
  type: SAVE_AUTHOR,
  author: author,
});

export const saveComments = (comments) => ({
  type: SAVE_COMMENTS,
  comments: comments,
});

export const toggleLoadingCampgrounds = () => ({
  type: TOGGLE_LOADING_CAMPGROUNDS,
});

export const toggleLoadingSelectedCampground = () => ({
  type: TOGGLE_LOADING_SELECTED_CAMPGROUND,
});

export const updateEditField = (newValue, fieldName) => ({
  type: UPDATE_EDIT_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});