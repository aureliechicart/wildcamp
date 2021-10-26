import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  FETCH_SELECTED_CAMPGROUND,
  saveSelectedCampground,
  saveAuthor,
  saveComments,
  toggleLoadingSelectedCampground,
  SUBMIT_EDITED_CAMPGROUND,
  SUBMIT_EDITED_COMMENT,
  saveEditedCommentId,
  DELETE_COMMENT,
  removeComment,
  SUBMIT_NEW_COMMENT,
  addComment,
  toggleAddCommentEditing,
  DELETE_SELECTED_CAMPGROUND,
  setCampgroundNotFound,
  setNotAuthor
} from '../actions/currentCampground';

import {
  saveCampgroundId,
  toggleLoadingCampgroundId
} from '../actions/newCampground';

import {
  updateCampgroundsAfterDelete
} from '../actions/campgrounds';

import {
  saveUser
} from '../actions/auth';

const campgroundsMiddleware = (store) => (next) => (action) => {

  // Function which calls the refresh to update the refresh token
  const refreshToken = async () => {
    console.log('****Time to refresh the token!****');
    console.log('loggedInUser from state : ', store.getState().auth.loggedInUser);
    try {
      const res = await axios.post("/api/refresh", {
        token: store.getState().auth.loggedInUser.refreshToken
      });

      store.dispatch(saveUser({
        ...store.getState().auth.loggedInUser,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      }));
      const user = JSON.parse(localStorage.getItem('user'));
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
      const decodedToken = jwt_decode(store.getState().auth.loggedInUser.accessToken);
      console.log('decoded token : ', decodedToken);
      // we refresh the token at each axios call to keep the right info in state
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
      console.log('config axios : ', config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  switch (action.type) {
    case FETCH_SELECTED_CAMPGROUND:
      axios.get(`/api/campgrounds/${action.id}`)
        .then((firstResponse) => {
          store.dispatch(saveSelectedCampground(firstResponse.data));
          return axios.get(`/api/users/${firstResponse.data.user_id}`);
        })
        .then((secondResponse) => {
          store.dispatch(saveAuthor(secondResponse.data.username));
          return axios.get(`/api/campgrounds/${action.id}/comments`);
        })
        .then((thirdResponse) => {
            store.dispatch(saveComments(thirdResponse.data));
        })
        .catch((error) => {
          if (error.response.data.campgroundNotFound) {
            store.dispatch(setCampgroundNotFound(true));
          } else if (error.response.data.noComments) {
            store.dispatch(saveComments([]));
          } else {
            console.log(error);
          }
        })
        .finally(() => {
          store.dispatch(toggleLoadingSelectedCampground());
        })
      break;

    case SUBMIT_EDITED_CAMPGROUND:
      // we send a put request using the information in state
      const { title, image, description, country } = store.getState().currentCampground.selectedCampground;
      console.log('edited campground - access from state : ', store.getState().auth.loggedInUser.accessToken);

      axiosJWT.put(`/api/campgrounds/${action.campgroundId}`, {
        title,
        image,
        description,
        country
      })
        .then((response) => {
          console.log(response.data);
          // once we get the id of the edited campground from the database
          // we save it in state
          // (here, receiving the id represents the fact the record has been updated in db)
          store.dispatch(saveCampgroundId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          // once the request is finished, we toggle the boolean
          // which represents if campground id is loaded
          store.dispatch(toggleLoadingCampgroundId());
        });
      break;

    case SUBMIT_EDITED_COMMENT:
      console.log(store.getState().auth.loggedInUser);
      const comments = store.getState().currentCampground.comments;
      const comment = comments.find((comment) => comment.id === action.commentId);
      axiosJWT.put(`/api/comments/${action.commentId}`, {
        text: comment.text
      })
        .then((response) => {
          store.dispatch(saveEditedCommentId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        });
      break;

    case DELETE_COMMENT:
      console.log('access token from state : ', store.getState().auth.loggedInUser);

      axiosJWT.delete(`/api/comments/${action.commentId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(removeComment(action.commentId));
        });
      break;

    case SUBMIT_NEW_COMMENT:

      const text = store.getState().currentCampground.newCommentValue;
      const user_id = store.getState().auth.loggedInUser.id;
      const author = store.getState().auth.loggedInUser.username;

      console.log('token from state : ', store.getState().auth.loggedInUser);

      axiosJWT.post(`/api/campgrounds/${action.campgroundId}/comments`, {
        text,
        user_id
      })
        .then((response) => {
          const fullComment = {
            ...response.data,
            author
          };
          console.log(fullComment);
          // Now I can dispatch the action with the proper comment structure
          store.dispatch(addComment(fullComment));
          store.dispatch(toggleAddCommentEditing());
        })
        .catch((error) => {
          console.log(error.response);
        });
      break;

    case DELETE_SELECTED_CAMPGROUND:
      axiosJWT.delete(`/api/campgrounds/${action.campgroundId}`)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            console.log(response);
          } else {
            //  used to remove the deleted campground from campgroundsList in state
            store.dispatch(updateCampgroundsAfterDelete(parseInt(action.campgroundId)));
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.reponse) {
            if (error.response.data.notAuthor) {
              store.dispatch(setNotAuthor(true));
            } else {
              console.log(error);
            }
          }
        });
      break;


    default:
  }

  next(action);
};

export default campgroundsMiddleware;