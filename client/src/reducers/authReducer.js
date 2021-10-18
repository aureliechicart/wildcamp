import {
  UPDATE_LOGIN_FIELD,
  SET_LOGIN_ERROR,
  SET_IS_LOGGED_IN,
  CLEAR_LOGIN,
} from '../actions/auth'

const initialState = {
  email: '',
  password: '',
  isLoggedIn: false,
  hasLoggedOutMessage: false,
  errors: {
    email: '',
    password: ''
  }
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

    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.value
      }

    case CLEAR_LOGIN:
      return {
        ...state,
        email: '',
        password: '',
        errors: {
          email: '',
          password: ''
        }
      }

      // case LOG_OUT:
      //   return {
      //     ...state,
      //     hasLoggedOutMessage: true
      //   }

    default:
      return state;
  }
}

export default authReducer;