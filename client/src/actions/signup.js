// === action types
export const UPDATE_SIGNUP_FIELD = 'UPDATE_SIGNUP_FIELD';
export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SET_IS_USER_CREATED = 'SET_IS_USER_CREATED';
export const TOGGLE_CLEAR_SIGNUP = 'TOGGLE_CLEAR_SIGNUP';
export const SET_ERROR = 'SET_ERROR';
export const TOGGLE_ALREADY_REGISTERED = 'TOGGLE_ALREADY_REGISTERED';
export const TOGGLE_PASSWORD_DIFFFER = 'TOGGLE_PASSWORD_DIFFFER';

// === action creators

export const updateSignupField = (newValue, fieldName) => ({
  type: UPDATE_SIGNUP_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitNewuser = () => ({
  type: SUBMIT_NEW_USER,
});

export const setIsUserCreated = (value) => ({
  type: SET_IS_USER_CREATED,
  value: value
});

export const toggleClearSignup = () => ({
  type: TOGGLE_CLEAR_SIGNUP,
});

export const setError = (fieldName, error) => ({
  type: SET_ERROR,
  fieldName: fieldName,
  error: error
});

export const toggleAlreadyRegistered = () => ({
  type: TOGGLE_ALREADY_REGISTERED,
});

export const togglePasswordDiffer = () => ({
  type: TOGGLE_PASSWORD_DIFFFER,
});
