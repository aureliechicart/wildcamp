// === action types
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SET_USER_NOT_FOUND = 'SET_USER_NOT_FOUND';
export const SET_INCORRECT_PASSWORD = 'SET_INCORRECT_PASSWORD';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';
export const SAVE_USER = 'SAVE_USER';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const CLEAR_USER = 'CLEAR_USER';
export const SAVE_AUTO_CHECKED_USER = 'SAVE_AUTO_CHECKED_USER';
export const SET_IS_FORM_VALID = 'SET_IS_FORM_VALID';
export const SET_IS_FORM_SUBMITTED = 'SET_IS_FORM_SUBMITTED';
export const CLEAR_VALIDITY = 'CLEAR_VALIDITY';
export const SET_API_ERROR_MESSAGE = 'SET_API_ERROR_MESSAGE';
export const SET_ERROR = 'SET_ERROR';

// check if user is authenticated in Page component (has routes)
export const CHECK_USER = 'CHECK_USER';

// === action creators

export const updateLoginField = (newValue, fieldName) => ({
  type: UPDATE_LOGIN_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const setIsAuthenticated = (value) => ({
  type: SET_IS_AUTHENTICATED,
  value: value
});

export const setUserNotFound = (value) => ({
  type: SET_USER_NOT_FOUND,
  value: value
});

export const setIncorrectPassword = (value) => ({
  type: SET_INCORRECT_PASSWORD,
  value: value
});

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});

export const submitLogout = () => ({
  type: SUBMIT_LOGOUT
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  user: user
});

export const checkUser = () => ({
  type: CHECK_USER,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});


export const saveAutoCheckedUser = (user) => ({
  type: SAVE_AUTO_CHECKED_USER,
  user: user
});

export const setIsFormSubmitted = (value) => ({
  type: SET_IS_FORM_SUBMITTED,
  value: value
});

export const setIsFormValid = (newValue) => ({
  type: SET_IS_FORM_VALID,
  newValue: newValue
});

export const clearValidity = (fieldName) => ({
  type: CLEAR_VALIDITY,
  fieldName: fieldName
});


export const setAPIErrorMessage = (message) => ({
  type: SET_API_ERROR_MESSAGE,
  message: message
});

export const setError = (fieldName, error) => ({
  type: SET_ERROR,
  fieldName: fieldName,
  error: error
});
