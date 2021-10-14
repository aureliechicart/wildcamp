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
  removeComment,
  SUBMIT_NEW_COMMENT,
  addComment,
  toggleAddCommentEditing,
  DELETE_SELECTED_CAMPGROUND,
  toggleCampgroundDeleted
} from '../actions/currentCampground';

import {
  saveCampgroundId,
  toggleLoadingCampgroundId
} from '../actions/newCampground';

import {
  updateCampgroundsAfterDelete
} from '../actions/campgrounds';

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
          if (error.response.status === 404) {
            console.log(error.response.data.message);
          } else {
            console.log(error.response);
          }
        })
        .finally(() => {
          store.dispatch(toggleLoadingSelectedCampground());
        });
      break;

    case SUBMIT_EDITED_CAMPGROUND:
      // we send a put request using the information in state
      axios.put(`/api/campgrounds/${action.campgroundId}`, {
        title: store.getState().currentCampground.selectedCampground.title,
        image: store.getState().currentCampground.selectedCampground.image,
        description: store.getState().currentCampground.selectedCampground.description,
        country: store.getState().currentCampground.selectedCampground.country,
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
      const comments = store.getState().currentCampground.comments;
      console.log(comments);
      const comment = comments.find((comment) => comment.id === action.commentId);
      axios.put(`/api/comments/${action.commentId}`, {
        text: comment.text
      })
        .then((response) => {
          store.dispatch(saveEditedCommentId(response.data.id));
        })
        .catch((error) => {
          console.log(error.response);
        })
      break;

    case DELETE_COMMENT:
      axios.delete(`/api/comments/${action.commentId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          store.dispatch(removeComment(action.commentId));
        })
      break;

    case SUBMIT_NEW_COMMENT:
      axios.post(`/api/campgrounds/${action.campgroundId}/comments`, {
        text: store.getState().currentCampground.newCommentValue,
        // TODO: get the logged user when login feature is ready
        // user_id hard-coded for now
        user_id: 1
      })
        .then((response) => {
          // I will need to get the username in the state once the login feature is up and running
          // I will then create the comment structure I want to add to the comments array in state
          // username is hard-coded for now
          const fullComment = { ...response.data, author: 'carrot' };

          // Now I can dispatch the action with the proper comment structure
          store.dispatch(addComment(fullComment));
          store.dispatch(toggleAddCommentEditing());
        })
        .catch((error) => {
          console.log(error.response);
        });
      break;

    case DELETE_SELECTED_CAMPGROUND:
      axios.delete(`/api/campgrounds/${action.campgroundId}`)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.data);
          } else {
            // acts on a boolean which helps redirect to home page after deletion
            store.dispatch(toggleCampgroundDeleted());
            //  used to remove the deleted campground from campgroundsList in state
            store.dispatch(updateCampgroundsAfterDelete(parseInt(action.campgroundId)));
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
      break;

    default:
  }

  next(action);
};

export default campgroundsMiddleware;