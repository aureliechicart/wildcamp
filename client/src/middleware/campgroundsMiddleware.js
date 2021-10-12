import axios from 'axios';

import {
  FETCH_CAMPGROUNDS,
  FETCH_SELECTED_CAMPGROUND,
  saveCampgrounds,
  saveSelectedCampground,
  saveAuthor,
  saveComments,
  toggleLoadingCampgrounds,
  toggleLoadingSelectedCampground,
  SUBMIT_EDITED_COMMENT,
  saveEditedCommentId
 } from '../actions/campgrounds';

const campgroundsMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      axios.get('/api/campgrounds')
        .then((response) => {
          // we want to store response.data in the state
          store.dispatch(saveCampgrounds(response.data));
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(toggleLoadingCampgrounds());
        });
      break;

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
          if (thirdResponse.data) {
            store.dispatch(saveComments(thirdResponse.data));
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(toggleLoadingSelectedCampground());
        });
      break;

      case SUBMIT_EDITED_COMMENT:
        const comments = store.getState().campgrounds.comments;
        const comment = comments.find((comment) => comment.id === action.commentId);
        axios.put(`/api/comments/${action.commentId}`, {
          text: comment.text
        })
        .then((response)=> {
          store.dispatch(saveEditedCommentId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        })
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;