import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  SUBMIT_LOGIN,
  clearLogin,
  setUserNotFound,
  setIncorrectPassword,
  SUBMIT_LOGOUT,
  saveUser,
  CHECK_USER,
  setIsAuthenticated,
  clearUser,
  saveAutoCheckedUser,
  setBannerDisplay
} from '../actions/auth';

const authMiddleware = (store) => (next) => (action) => {

  // Function which calls the refresh to update the refresh token
  const refreshToken = async () => {
    try {
      const res = await axios.post("/api/refresh", {
        token: store.getState().auth.loggedInUser.refreshToken
      });
      const user = JSON.parse(localStorage.getItem('user'));
      store.dispatch(saveUser({
        ...store.getState().auth.loggedInUser,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        id: user.id
      }));

      const newUser = {
        id: user.id,
        jwt: res.data.refreshToken
      }
      localStorage.setItem('user', JSON.stringify(newUser));
      return res.data;
    } catch (error) {
      console.log('auth - refresh route - error from catch : ', error);
    }
  };

  // adding headers to axios calls (POST calls, except /login)
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();

      // if the user has not logged in yet
      if (!store.getState().auth.loggedInUser.accessToken) {
        store.dispatch(setIsAuthenticated(false));
      } else {
        const decodedToken = jwt_decode(store.getState().auth.loggedInUser.accessToken);
        // if the token is expired, we refresh it
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["x-access-token"] = data.accessToken;
        } else {
          config.headers["x-access-token"] = store.getState().auth.loggedInUser.accessToken;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  switch (action.type) {
    case SUBMIT_LOGIN:
      // we signup the new user using the information in state
      const { email, password } = store.getState().auth;
      axios.post('/api/login', {
        email,
        password
      })
        .then((response) => {
          // we toggle boolean to hide login CTA
          store.dispatch(setBannerDisplay(false));
          // we reset the inputs and errors
          store.dispatch(clearLogin());
          // we save the user
          store.dispatch(saveUser(response.data.user));

          const user = {
            id: response.data.user.id,
            jwt: response.data.user.refreshToken
          }
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => {
          if (error.response.data.noUserFound) {
            store.dispatch(setUserNotFound(true));
          } else if (error.response.data.incorrectPassword) {
            store.dispatch(setIncorrectPassword(true));
          }
        });
      break;

    case SUBMIT_LOGOUT:
      const user = JSON.parse(localStorage.getItem("user"));
      axiosJWT.post('/api/logout',
        { token: user.jwt })
        .then((response) => {
          // we reset the user saved in state
          store.dispatch(clearUser());
          // we clear localStorage
          localStorage.clear();
        })
        .catch((error) => {
          console.log('logout - error from catch : ', error);
        });
      break;

    case CHECK_USER:
      axios.get('/api/auth/user')
        .then((response) => {
          // we save the authenticated user in state
          store.dispatch(saveAutoCheckedUser(response.data));

          // there is no accessToken or refreshToken saved in state yet
          // but the last refresh token is available in localStorage

          const user = JSON.parse(localStorage.getItem("user"));
          // if we have the user item in localStorage, we call the refresh endpoint to get a new accessToken and refreshToken
          if (user) {
            return axios.post('/api/refresh',
              { token: user.jwt });
          }
        })
        .then((secondResponse) => {
          const user = JSON.parse(localStorage.getItem('user'));
          // we add the tokens in state
          store.dispatch(saveAutoCheckedUser({
            ...store.getState().auth.loggedInUser,
            ...secondResponse.data,
            id: user.id
          }));

          const newUser = {
            id: user.id,
            jwt: secondResponse.data.refreshToken
          }
          // we update the user item in localStorage with the new refresh token
          localStorage.setItem('user', JSON.stringify(newUser));
        })
        .catch((error) => {
          if (!error.response.data.success) {
            store.dispatch(setIsAuthenticated(false));
            store.dispatch(setBannerDisplay(true));
          }
        })
      break;



    default:
  }

  next(action);
};

export default authMiddleware;