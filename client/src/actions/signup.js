// === action types
export const UPDATE_SIGNUP_FIELD = 'UPDATE_SIGNUP_FIELD';
export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const TOGGLE_USER_CREATED = 'TOGGLE_USER_CREATED';
export const TOGGLE_CLEAR_SIGNUP = 'TOGGLE_CLEAR_SIGNUP';

// === action creators

export const updateSignupField = (newValue, fieldName) => ({
  type: UPDATE_SIGNUP_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitNewuser = () => ({
  type: SUBMIT_NEW_USER,
});

export const toggleUserCreated = () => ({
  type: TOGGLE_USER_CREATED,
});

export const toggleClearSignup = () => ({
  type: TOGGLE_CLEAR_SIGNUP,
});