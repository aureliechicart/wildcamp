// === action types
export const FETCH_CAMPGROUNDS = 'FETCH_CAMPGROUNDS';
export const SAVE_CAMPGROUNDS = 'SAVE_CAMPGROUNDS';

// === action creators
export const fetchCampgrounds = () => ({
  type: FETCH_CAMPGROUNDS,
});

export const saveCampgrounds = (campgrounds) => ({
  type: SAVE_CAMPGROUNDS,
  campgrounds: campgrounds,
});