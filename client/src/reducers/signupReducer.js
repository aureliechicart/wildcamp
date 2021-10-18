import {
  UPDATE_SIGNUP_FIELD,
  TOGGLE_USER_CREATED,
  TOGGLE_CLEAR_SIGNUP,
  SET_ERROR,
  TOGGLE_ALREADY_REGISTERED,
  TOGGLE_PASSWORD_DIFFFER
} from '../actions/signup';

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  isUserCreated: false,
  errors: {
    email: '',
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

    case TOGGLE_USER_CREATED:
      return {
        ...state,
        isUserCreated: true
      }

    case TOGGLE_CLEAR_SIGNUP:
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

    case TOGGLE_PASSWORD_DIFFFER:
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