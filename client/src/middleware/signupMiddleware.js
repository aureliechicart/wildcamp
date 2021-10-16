import axios from 'axios';

import {
  SUBMIT_NEW_USER,
  toggleUserCreated,
  toggleClearSignup
} from '../actions/signup';

const signupMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_NEW_USER:
      // we signup the new user using the information in state
      const { email, username, password, passwordConfirm } = store.getState().signup;
      console.log(email, username, password, passwordConfirm);
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
            store.dispatch(toggleUserCreated());
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          // once the request is finished, we toggle a boolean
          // to clear the signup form state info
          store.dispatch(toggleClearSignup());

        });
      break;



    default:
  }

  next(action);
};

export default signupMiddleware;