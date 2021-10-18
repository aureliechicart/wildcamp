// === action types
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_USER_NOT_FOUND = 'SET_USER_NOT_FOUND';
export const SET_INCORRECT_PASSWORD = 'SET_INCORRECT_PASSWORD';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';

// === action creators

export const updateLoginField = (newValue, fieldName) => ({
  type: UPDATE_LOGIN_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const setIsLoggedIn = (value) => ({
  type: SET_IS_LOGGED_IN,
  value: value
});

export const setLoginError = (fieldName, error) => ({
  type: SET_LOGIN_ERROR,
  fieldName: fieldName,
  error: error
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

