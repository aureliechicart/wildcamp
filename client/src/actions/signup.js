// === action types
export const UPDATE_SIGNUP_FIELD = 'UPDATE_SIGNUP_FIELD';
export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SET_ERROR = 'SET_ERROR';
export const TOGGLE_ALREADY_REGISTERED = 'TOGGLE_ALREADY_REGISTERED';
export const TOGGLE_PASSWORD_DIFFER = 'TOGGLE_PASSWORD_DIFFER';
export const CLEAR_SIGNUP_FORM = 'CLEAR_SIGNUP_FORM';
export const SET_IS_FORM_SUBMITTED = 'SET_IS_FORM_SUBMITTED';

// === action creators

export const updateSignupField = (newValue, fieldName) => ({
  type: UPDATE_SIGNUP_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitNewUser = () => ({
  type: SUBMIT_NEW_USER,
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
  type: TOGGLE_PASSWORD_DIFFER,
});

export const clearSignupForm = () => ({
  type: CLEAR_SIGNUP_FORM,
})

export const setIsFormSubmitted = (value) => ({
  type: SET_IS_FORM_SUBMITTED,
  value: value
})