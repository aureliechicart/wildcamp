import { connect } from 'react-redux';

import {
  toggleCommentEditing,
  submitEditedComment,
  deleteComment,
  toggleAddCommentEditing,
  submitNewComment,
  updateAddCommentField,
  updateEditCommentField

} from '../../actions/currentCampground';

// importing presentational component
import Comments from '../../components/campgrounds/Comments';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  selectedCampground: state.currentCampground.selectedCampground,
  comments: state.currentCampground.comments,
  commentEditing: state.currentCampground.commentEditing,
  selectedCommentId: state.currentCampground.selectedCommentId,
  addCommentEditing: state.currentCampground.addCommentEditing,
  newCommentValue: state.currentCampground.newCommentValue,
  loggedInUser: state.auth.loggedInUser,
  isAuthenticated: state.auth.isAuthenticated
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
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
  }

});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(Comments);