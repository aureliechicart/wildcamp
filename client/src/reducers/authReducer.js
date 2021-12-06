import {
  UPDATE_LOGIN_FIELD,
  SET_LOGIN_ERROR,
  CLEAR_LOGIN,
  SAVE_USER,
  SET_INCORRECT_PASSWORD,
  SET_USER_NOT_FOUND,
  SET_IS_AUTHENTICATED,
  CLEAR_USER,
  SAVE_AUTO_CHECKED_USER,
  SET_BANNER_DISPLAY
} from '../actions/auth'

const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  loggedInUser: {},
  errors: {
    email: '',
    password: '',
    incorrectPassword: false,
    userNotFound: false
  },
  bannerDisplayed: false,
  focused: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };

    case SET_LOGIN_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.fieldName]: action.error
        }
      }

    case CLEAR_LOGIN:
      return {
        ...state,
        email: '',
        password: '',
        errors: {
          email: '',
          password: '',
          incorrectPassword: false,
          userNotFound: false
        }
      }

    case SAVE_USER:
      return {
        ...state,
        loggedInUser: { ...action.user },
        isAuthenticated: true
      }

    case SAVE_AUTO_CHECKED_USER:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          ...action.user
        },
        isAuthenticated: true
      }

    case SET_INCORRECT_PASSWORD:
      return {
        ...state,
        errors: {
          ...state.errors,
          incorrectPassword: action.value
        }
      }

    case SET_USER_NOT_FOUND:
      return {
        ...state,
        errors: {
          ...state.errors,
          userNotFound: action.value
        },
        isAuthenticated: false
      }

    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.value
      }

    case CLEAR_USER:
      return {
        ...state,
        loggedInUser: {},
        errors: {
          email: '',
          password: '',
          incorrectPassword: false,
          userNotFound: false
        }
      }

    case SET_BANNER_DISPLAY:
      return {
        ...state,
        bannerDisplayed: action.value
      }

    default:
      return state;
  }
}

export default authReducer;