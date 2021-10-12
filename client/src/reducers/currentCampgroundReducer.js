import {
  SAVE_SELECTED_CAMPGROUND,
  SAVE_AUTHOR,
  SAVE_COMMENTS,
  TOGGLE_LOADING_SELECTED_CAMPGROUND,
  UPDATE_EDIT_FIELD,
  TOGGLE_COMMENT_EDITING,
  UPDATE_EDIT_COMMENT_FIELD,
  SAVE_EDITED_COMMENT_ID
} from '../actions/currentCampground'

const initialState = {
  selectedCampground: {},
  author: '',
  comments: [],
  loadingSelectedCampground: true,
  commentEditing: false,
  selectedCommentId: '',
  editedCommentId: ''
};

function currentCampgroundReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_SELECTED_CAMPGROUND:
      return {
        ...state,
        selectedCampground: action.selectedCampground,
      };

    case SAVE_AUTHOR:
      return {
        ...state,
        author: action.author,
      };

    case SAVE_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case TOGGLE_LOADING_SELECTED_CAMPGROUND:
      return {
        ...state,
        loadingSelectedCampground: false,
      };

    case UPDATE_EDIT_FIELD:
      return {
        ...state,
        selectedCampground: {
          ...state.selectedCampground,
          [action.fieldName]: action.newValue
        }
      };

    case TOGGLE_COMMENT_EDITING:
      return {
        ...state,
        commentEditing: !state.commentEditing,
        selectedCommentId: action.commentId
      };

    case UPDATE_EDIT_COMMENT_FIELD:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.commentId) {
            return {
              ...comment,
              text: action.newValue
            }
          } else {
            return comment;
          }
        })
      };

    case SAVE_EDITED_COMMENT_ID:
      return {
        ...state,
        editedCommentId: action.editedCommentId,
        commentEditing: false,
      };


    default:
      return state;
  }
}

export default currentCampgroundReducer;