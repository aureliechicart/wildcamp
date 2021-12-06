import {
  UPDATE_SIGNUP_FIELD,
  SET_IS_USER_CREATED,
  SET_ERROR,
  TOGGLE_ALREADY_REGISTERED,
  TOGGLE_PASSWORD_DIFFER,
  CLEAR_SIGNUP_FORM
} from '../actions/signup';

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  isUserCreated: false,
  errors: {
    email: '',
    username: '',
    password: '',
    alreadyRegistered: false,
    passwordDiffer: false
  }
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIGNUP_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      }

    case SET_IS_USER_CREATED:
      return {
        ...state,
        isUserCreated: action.value
      }

    case CLEAR_SIGNUP_FORM:
      return {
        ...state,
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        errors: {
          email: '',
          password: '',
          alreadyRegistered: false,
          passwordDiffer: false
        }
      }

    case SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.fieldName]: action.error
        }
      }

    case TOGGLE_ALREADY_REGISTERED:
      return {
        ...state,
        errors: {
          ...state.errors,
          alreadyRegistered: true
        }
      }

    case TOGGLE_PASSWORD_DIFFER:
      return {
        ...state,
        errors: {
          ...state.errors,
          passwordDiffer: true
        }
      }


    default:
      return state;
  }
}

export default signupReducer;