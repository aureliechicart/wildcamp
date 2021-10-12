import axios from 'axios';

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
  removeComment
 } from '../actions/currentCampground';
 import {
  saveCampgroundId,
  toggleLoadingCampgroundId,
 } from '../actions/newCampground';

const campgroundsMiddleware = (store) => (next) => (action) => {

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

      case SUBMIT_EDITED_CAMPGROUND:
      // we send a put request using the information in state
      axios.put(`/api/campgrounds/${action.campgroundId}`, {
        title: store.getState().campgrounds.selectedCampground.title,
        image: store.getState().campgrounds.selectedCampground.image,
        description: store.getState().campgrounds.selectedCampground.description,
        country: store.getState().campgrounds.selectedCampground.country,
        // user_id: only the user who posted this record can change it
        // this means the user_id won't change and is not relevant here
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

      case DELETE_COMMENT:
        console.log(action.commentId);
        axios.delete(`/api/comments/${action.commentId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(()=> {
          store.dispatch(removeComment(action.commentId));
        })
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;