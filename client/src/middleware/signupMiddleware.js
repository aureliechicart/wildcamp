import axios from 'axios';

import {
  SUBMIT_NEW_USER,
  clearSignupForm,
  setAPIErrorMessage,
  setIsFormSubmitted
} from '../actions/signup';

const signupMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_NEW_USER:
      // we signup the new user using the information in state
      const { email, username, password, passwordConfirm } = store.getState().signup;
      const newUser = {
        email: email.val,
        username: username.val,
        password: password.val,
        passwordConfirm: passwordConfirm.val
      }
      axios.post('/api/signup', newUser)
        .then((response) => {
          // once we get the id of the new user from the database
          if (response.data.user.id) {
            // we reset the inputs and errors
            store.dispatch(clearSignupForm());
            // we let the component know the form submission is successful for redirection
            store.dispatch(setIsFormSubmitted(true));
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            store.dispatch(setAPIErrorMessage(error.response.data.message));
          } else {
            store.dispatch(setAPIErrorMessage(error.response.data));
          }
        });
      break;



    default:
  }

  next(action);
};

export default signupMiddleware;