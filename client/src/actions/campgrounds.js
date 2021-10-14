// === action types
export const FETCH_CAMPGROUNDS = 'FETCH_CAMPGROUNDS';
export const SAVE_CAMPGROUNDS = 'SAVE_CAMPGROUNDS';

export const TOGGLE_LOADING_CAMPGROUNDS = 'TOGGLE_LOADING_CAMPGROUNDS';

export const UPDATE_CAMPGROUNDS_AFTER_DELETE = 'UPDATE_CAMPGROUNDS_AFTER_DELETE';

// === action creators
export const fetchCampgrounds = () => ({
  type: FETCH_CAMPGROUNDS,
});

export const saveCampgrounds = (campgrounds) => ({
  type: SAVE_CAMPGROUNDS,
  campgrounds: campgrounds,
});

export const toggleLoadingCampgrounds = () => ({
  type: TOGGLE_LOADING_CAMPGROUNDS,
});

export const updateCampgroundsAfterDelete = (campgroundId) => ({
  type: UPDATE_CAMPGROUNDS_AFTER_DELETE,
  // Id of the campground to remove
  campgroundId: campgroundId
});
