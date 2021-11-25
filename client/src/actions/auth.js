// === action types
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_USER_NOT_FOUND = 'SET_USER_NOT_FOUND';
export const SET_INCORRECT_PASSWORD = 'SET_INCORRECT_PASSWORD';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';
export const SAVE_USER = 'SAVE_USER';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const CLEAR_USER = 'CLEAR_USER';
export const SAVE_AUTO_CHECKED_USER = 'SAVE_AUTO_CHECKED_USER';

// check if user is authenticated in Page component (has routes)
export const CHECK_USER = 'CHECK_USER';

export const SET_BANNER_DISPLAY = 'SET_BANNER_DISPLAY';

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
})

export const setBannerDisplay = (value) => ({
  type: SET_BANNER_DISPLAY,
  value: value
});