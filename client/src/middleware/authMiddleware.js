import axios from 'axios';

import {
  SUBMIT_LOGIN,
  setIsLoggedIn,
  clearLogin,
  setUserNotFound,
  setIncorrectPassword,
  SUBMIT_LOGOUT
} from '../actions/auth';
import { setBannerDisplay } from '../actions/campgrounds';

const authMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_LOGIN:
      // we signup the new user using the information in state
      const { email, password } = store.getState().auth;
      axios.post('/api/login', {
        email,
        password
      })
        .then((response) => {
          // once we get the id of the new user from the database
          // we save it in state
          console.log(response.data);
          if (response.data.user.id) {
            // we toggle boolean to display confirmation message
            store.dispatch(setBannerDisplay(true));
            store.dispatch(setIsLoggedIn(true));
            // we reset the inputs and errors
            store.dispatch(clearLogin());
            
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.noUserFound) {
            store.dispatch(setUserNotFound(true));
          } else if (error.response.data.incorrectPassword) {
            store.dispatch(setIncorrectPassword(true));
          }
        });
      break;

      case SUBMIT_LOGOUT:
        console.log("action logout dans middleware");
        // axios.post('api/logout',
        // {token: ''})
        // if it works toggle isLoggedIn and display confirmation message
        store.dispatch(setIsLoggedIn(false));
      break;



    default:
  }

  next(action);
};

export default authMiddleware;