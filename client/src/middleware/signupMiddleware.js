import axios from 'axios';

import {
  SUBMIT_NEW_USER,
  setIsUserCreated,
  toggleClearSignup,
  toggleAlreadyRegistered,
  togglePasswordDiffer
} from '../actions/signup';

const signupMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_NEW_USER:
      // we signup the new user using the information in state
      const { email, username, password, passwordConfirm } = store.getState().signup;
      axios.post('/api/signup', {
        email,
        username,
        password,
        passwordConfirm
      })
        .then((response) => {
          // once we get the id of the new user from the database
          // we save it in state
          if (response.data.id) {
            // we togg:e boolean to display confirmation message
            store.dispatch(setIsUserCreated(true));
            // we reset the inputs and errors
            store.dispatch(toggleClearSignup());
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.message === 'A user will this email is already registered') {
            store.dispatch(toggleAlreadyRegistered());
          } else if (error.response.data.message === 'The password and password confirmation are different') {
            store.dispatch(togglePasswordDiffer());
          }
        });
      break;



    default:
  }

  next(action);
};

export default signupMiddleware;