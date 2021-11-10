import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  SUBMIT_CAMPGROUND,
  saveCampgroundId,
  toggleLoadingCampgroundId
} from '../actions/newCampground';

import {
  updateCampgroundsAfterAdd
} from '../actions/campgrounds';

import {
  saveUser
} from '../actions/auth';

const newCampgroundMiddleware = (store) => (next) => (action) => {

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
      console.log('newCampground - refresh route - error from catch : ', error);
    }
  };

  // adding headers to axios calls (POST calls, except /login)
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      console.log('****newCampground - Time to refresh the token!****');
      let currentDate = new Date();
      const decodedToken = jwt_decode(store.getState().auth.loggedInUser.accessToken);
      console.log('decoded token : ', decodedToken);
      // if the token is expired, we refresh it
      console.log(decodedToken.exp * 1000);
      console.log(currentDate.getTime());
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("d'après l'axios interceptor, mon accessToken est expiré, je relance un refresh");
        const data = await refreshToken();
        config.headers["x-access-token"] = data.accessToken;
        console.log('config axios : ', config);
      } else {
        config.headers["x-access-token"] = store.getState().auth.loggedInUser.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  switch (action.type) {
    case SUBMIT_CAMPGROUND: {
      // we post the new campground using the information in state
      const { title, image, description, country } = store.getState().newCampground;
      const { accessToken } = store.getState().auth.loggedInUser;
      const user_id = store.getState().auth.loggedInUser.id;
      console.log('user_id in state : ', user_id);
      console.log('jwt from state : ', accessToken);
      console.log('info from localStorage : ', JSON.parse(localStorage.getItem('user')));

      axiosJWT.post('/api/campgrounds', {
        title,
        image,
        description,
        country,
        user_id: user_id
      })
        .then((response) => {
          console.log('campground posté !');
          // once we get the id of the new campground from the database
          // we save it in state
          store.dispatch(saveCampgroundId(response.data.id));
          // updates campground list in state with new campground
          store.dispatch(updateCampgroundsAfterAdd(response.data));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          // once the request is finished, we toggle the boolean
          // which represents if campground id is available
          store.dispatch(toggleLoadingCampgroundId());

        });
    }
      break;



    default:
  }

  next(action);
};

export default newCampgroundMiddleware;