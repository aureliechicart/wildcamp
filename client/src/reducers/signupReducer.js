import {
  UPDATE_SIGNUP_FIELD
} from '../actions/signup';

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIGNUP_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };

    default:
      return state;
  }
}

export default signupReducer;