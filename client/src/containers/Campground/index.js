import { connect } from 'react-redux';

import {
  fetchSelectedCampground,
  toggleCommentEditing,
  submitEditedComment,
  updateEditCommentField,
  deleteComment,
  toggleAddCommentEditing,
  updateAddCommentField,
  submitNewComment,
  deleteSelectedCampground,
  clearSelectedCampground
} from '../../actions/currentCampground';

import {
  clearAddCamgroundForm
} from '../../actions/newCampground'

// importing presentational component
import Campground from '../../components/Campground';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  selectedCampground: state.currentCampground.selectedCampground,
  author: state.currentCampground.author,
  comments: state.currentCampground.comments,
  loadingSelectedCampground: state.currentCampground.loadingSelectedCampground,
  commentEditing: state.currentCampground.commentEditing,
  selectedCommentId: state.currentCampground.selectedCommentId,
  addCommentEditing: state.currentCampground.addCommentEditing,
  newCommentValue: state.currentCampground.newCommentValue,
  campgroundNotFound: state.currentCampground.campgroundNotFound,
  errors: state.currentCampground.errors,
  loggedInUser: state.auth.loggedInUser,
  isAuthenticated: state.auth.isAuthenticated
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  loadSelectedCampground: (id) => {
    dispatch(fetchSelectedCampground(id));
  },
  toggleCommentEditing: (commentId) => {
    dispatch(toggleCommentEditing(commentId));
  },
  submitEditedComment: (commentId) => {
    dispatch(submitEditedComment(commentId));
  },
  changeCommentField: (newValue, commentId) => {
    dispatch(updateEditCommentField(newValue, commentId));
  },
  deleteComment: (commentId) => {
    dispatch(deleteComment(commentId));
  },
  toggleAddCommentEditing: () => {
    dispatch(toggleAddCommentEditing());
  },
  changeAddCommentField: (newValue) => {
    dispatch(updateAddCommentField(newValue));
  },
  submitNewComment: (campgroundId) => {
    dispatch(submitNewComment(campgroundId));
  },
  deleteCampground: (campgroundId) => {
    dispatch(deleteSelectedCampground(campgroundId));
  },
  clearAddCamgroundForm: () => {
    dispatch(clearAddCamgroundForm());
  },
  clearSelectedCampground: () => {
    dispatch(clearSelectedCampground());
  }

});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(Campground);