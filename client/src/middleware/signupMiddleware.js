import axios from 'axios';

import {
  SUBMIT_NEW_USER,
  clearSignupForm,
  toggleAlreadyRegistered,
  togglePasswordDiffer,
  setIsFormSubmitted
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
          console.log('response fom signup', response);
          if (response.data.user.id) {
            // we reset the inputs and errors
            store.dispatch(clearSignupForm());
            // we let the component know the form submission is successful for redirection
            store.dispatch(setIsFormSubmitted(true));
          }
        })
        .catch((error) => {
          console.log('error from signup', error);
          if (error.response.data.message === 'A user will this email is already registered') {
            store.dispatch(toggleAlreadyRegistered());
          } else if (error.response.data.message === 'The password and password confirmation are different' || error.response.data === '"passwordConfirm" must be [ref:password]') {
            store.dispatch(togglePasswordDiffer());
          }
        });
      break;



    default:
  }

  next(action);
};

export default signupMiddleware;