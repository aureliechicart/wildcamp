// === action types
export const UPDATE_CAMPGROUND_FIELD = 'UPDATE_CAMPGROUND_FIELD';

export const SUBMIT_CAMPGROUND = 'SUBMIT_CAMPGROUND';
export const SAVE_CAMPGROUND_ID = 'SAVE_CAMPGROUND_ID';

export const TOGGLE_LOADING_CAMPGROUND_ID = 'TOGGLE_LOADING_CAMPGROUND_ID';

export const CLEAR_ADD_CAMPGROUND_FORM = 'CLEAR_ADD_CAMPGROUND_FORM';



// === action creators

export const updateCampgroundField = (newValue, fieldName) => ({
  type: UPDATE_CAMPGROUND_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitCampground = () => ({
  type: SUBMIT_CAMPGROUND,
});

export const saveCampgroundId = (campgroundId) => ({
  type: SAVE_CAMPGROUND_ID,
  campgroundId: campgroundId
});

export const toggleLoadingCampgroundId = () => ({
  type: TOGGLE_LOADING_CAMPGROUND_ID,
});

export const clearAddCamgroundForm = () => ({
  type: CLEAR_ADD_CAMPGROUND_FORM,
});