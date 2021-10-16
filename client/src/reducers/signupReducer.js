import {
  UPDATE_SIGNUP_FIELD,
  TOGGLE_USER_CREATED,
  TOGGLE_CLEAR_SIGNUP
} from '../actions/signup';

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  isUserCreated: false,
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
      }

    default:
      return state;
  }
}

export default signupReducer;