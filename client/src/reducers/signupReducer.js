import {
  UPDATE_SIGNUP_FIELD,
  SET_ERROR,
  TOGGLE_ALREADY_REGISTERED,
  TOGGLE_PASSWORD_DIFFER,
  CLEAR_SIGNUP_FORM,
  SET_IS_FORM_VALID,
  CLEAR_VALIDITY,
  SET_IS_FORM_SUBMITTED,
  SET_API_ERROR_MESSAGE
} from '../actions/signup';

const initialState = {
  email: {
    val: '',
    error: null
  },
  username: {
    val: '',
    error: null
  },
  password: {
    val: '',
    error: null
  },
  passwordConfirm: {
    val: '',
    error: null
  },
  isFormValid: true,
  isFormSubmitted: false,
  apiErrorMessage: null
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIGNUP_FIELD:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          val: action.newValue
        }
      }

    case CLEAR_SIGNUP_FORM:
      return {
        ...state,
        email: {
          val: '',
          error: null
        },
        username: {
          val: '',
          error: null
        },
        password: {
          val: '',
          error: null
        },
        passwordConfirm: {
          val: '',
          error: null
        },
        isFormSubmitted: false,
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

    case CLEAR_VALIDITY:
      return {
        ...state,
        [action.fieldName]: {
          ...state[action.fieldName],
          error: null
        }
      }

    case SET_IS_FORM_SUBMITTED:
      return {
        ...state,
        isFormSubmitted: action.value
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

export default signupReducer;