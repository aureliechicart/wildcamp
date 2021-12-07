import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  FETCH_SELECTED_CAMPGROUND,
  saveSelectedCampground,
  saveAuthor,
  saveComments,
  setLoadingSelectedCampground,
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
  saveUser,
  setIsAuthenticated
} from '../actions/auth';

const campgroundsMiddleware = (store) => (next) => (action) => {

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
      console.log('currentCampground - refresh route - error from catch : ', error);
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
            console.log(error.response.data);
          }
        })
        .finally(() => {
          store.dispatch(setLoadingSelectedCampground(false));
        })
      break;

    case SUBMIT_EDITED_CAMPGROUND:
      // we send a put request using the information in state
      const { title, image, description, country } = store.getState().currentCampground.selectedCampground;

      axiosJWT.put(`/api/campgrounds/${action.campgroundId}`, {
        title,
        image,
        description,
        country
      })
        .then((response) => {
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

      axiosJWT.post(`/api/campgrounds/${action.campgroundId}/comments`, {
        text,
        user_id
      })
        .then((response) => {
          const fullComment = {
            ...response.data,
            author
          };
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