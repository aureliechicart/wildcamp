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
  saveAutoCheckedUser
} from '../actions/auth';

import { setBannerDisplay } from '../actions/campgrounds';

const authMiddleware = (store) => (next) => (action) => {

  // Function which calls the refresh to update the refresh token
  const refreshToken = async () => {
    console.log('****Time to refresh the token!****');
    console.log('loggedInUser from state : ', store.getState().auth.loggedInUser);
    try {
      const res = await axios.post("/api/refresh", {
        token: store.getState().auth.loggedInUser.refreshToken
      });
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('check if user in state : ', store.getState().auth.loggedInUser);
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
      console.log('saved in localStorage : ', JSON.parse(localStorage.getItem('user')));
      return res.data;
    } catch (error) {
      console.log('refresh route - error from catch : ', error);
    }
  };

  // adding headers to axios calls (POST calls, except /login)
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      console.log('****config axios auth****');
      console.log('accessToken dans state : ', store.getState().auth.loggedInUser.accessToken);
      let currentDate = new Date();
      const decodedToken = jwt_decode(store.getState().auth.loggedInUser.accessToken);
      console.log('decoded token : ', decodedToken);
      // we refresh the token at each axios call to keep the right info in state
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("d'après l'axios interceptor, mon accessToken est expiré, je relance un refresh");
        const data = await refreshToken();
        config.headers["x-access-token"] = data.accessToken;
        console.log('config axios : ', config);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  switch (action.type) {
    case SUBMIT_LOGIN:
      console.log('***submit login****');
      // we signup the new user using the information in state
      const { email, password } = store.getState().auth;
      axios.post('/api/login', {
        email,
        password
      })
        .then((response) => {
          // we toggle boolean to display confirmation message
          store.dispatch(setBannerDisplay(true));
          // we reset the inputs and errors
          store.dispatch(clearLogin());
          // we save the user
          store.dispatch(saveUser(response.data.user));

          const user = {
            id: response.data.user.id,
            jwt: response.data.user.refreshToken
          }
          localStorage.setItem("user", JSON.stringify(user));
          console.log('saved in localStorage : ', JSON.parse(localStorage.getItem('user')));
        })
        .catch((error) => {
          if (error.response.data.noUserFound) {
            store.dispatch(setUserNotFound(true));
          } else if (error.response.data.incorrectPassword) {
            store.dispatch(setIncorrectPassword(true));
          }

          console.log('submit login - error from catch : ', error.response);
        });
      break;

    case SUBMIT_LOGOUT:
      console.log("****logout*****");
      const user = JSON.parse(localStorage.getItem("user"));
      axiosJWT.post('/api/logout',
        { token: user.jwt })
        .then((response) => {
          console.log('response logout: ', response);
          // if it works toggle isAuthenticated and display confirmation message
          store.dispatch(setIsAuthenticated(false));
          // we reset the user saved in state
          store.dispatch(clearUser());
          // we clear localStorage
          localStorage.clear();
          console.log('length of localstorage : ', window.localStorage.length);
        })
        .catch((error) => {
          console.log('logout - error from catch : ', error);
        });
      break;

    case CHECK_USER:
      console.log('****Check user****');
      axios.get('/api/auth/user')
        .then((response) => {
          console.log(`checking user based on cookie : `, response.data);
          // we save the authenticated user in state
          store.dispatch(saveAutoCheckedUser(response.data));

          // there is no accessToken or refreshToken saved in state yet
          // but the last refresh token is available in localStorage

          const user = JSON.parse(localStorage.getItem("user"));
          console.log('user from localstorage : ', user);
          console.log('loggedInUser dans le state : ', store.getState().auth.loggedInUser);

          // if we have the user item in localStorage, we call the refresh endpoint to get a new accessToken and refreshToken
          if (user) {
            return axios.post('/api/refresh',
              { token: user.jwt });
          }
        })
        .then((secondResponse) => {
          console.log('response from /refresh : ', secondResponse.data);
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
          console.log('user saved in localStorage : ', JSON.parse(localStorage.getItem('user')));
        })
        .catch((error) => {
          console.log('checkuser - verify jwt error : ', error.response);
          if (error.response.status === 401) {
            store.dispatch(setIsAuthenticated(false));
          }
        })
      break;



    default:
  }

  next(action);
};

export default authMiddleware;