import {
  UPDATE_LOGIN_FIELD,
  CLEAR_LOGIN,
  SAVE_USER,
  SET_IS_AUTHENTICATED,
  CLEAR_USER,
  SAVE_AUTO_CHECKED_USER,
  SET_ERROR,
  SET_IS_FORM_VALID,
  CLEAR_VALIDITY,
  SET_API_ERROR_MESSAGE
} from '../actions/auth'

const initialState = {
  email: {
    val: '',
    error: null
  },
  password: {
    val: '',
    error: null
  },
  isAuthenticated: false,
  loggedInUser: {},
  focused: false,
  isFormValid: true,
  apiErrorMessage: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          val: action.newValue
        }
      }

    case CLEAR_LOGIN:
      return {
        ...state,
        email: {
          val: '',
          error: null
        },
        password: {
          val: '',
          error: null
        },
        focused: false,
        isFormValid: true,
        apiErrorMessage: null
      }

    case SAVE_USER:
      return {
        ...state,
        loggedInUser: { ...action.user }
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

    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.value
      }

    case CLEAR_USER:
      return {
        ...state,
        loggedInUser: {},
      }

    case SET_ERROR:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          error: action.error
        }
      }

    case SET_IS_FORM_VALID:
      return {
        ...state,
        isFormValid: action.newValue
      }

    case CLEAR_VALIDITY:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          error: null
        }
      }

    case SET_API_ERROR_MESSAGE:
      return {
        ...state,
        apiErrorMessage: action.message
      }

    default:
      return state;
  }
}

export default authReducer;