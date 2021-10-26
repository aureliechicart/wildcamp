import {
  SAVE_SELECTED_CAMPGROUND,
  SAVE_AUTHOR,
  SAVE_COMMENTS,
  TOGGLE_LOADING_SELECTED_CAMPGROUND,
  UPDATE_EDIT_FIELD,
  TOGGLE_COMMENT_EDITING,
  UPDATE_EDIT_COMMENT_FIELD,
  SAVE_EDITED_COMMENT_ID,
  REMOVE_COMMENT,
  TOGGLE_ADD_COMMENT_EDITING,
  UPDATE_ADD_COMMENT_FIELD,
  ADD_COMMENT,
  SET_CAMPGROUND_NOT_FOUND,
  SET_NOT_AUTHOR,
  CLEAR_SELECTED_CAMPGROUND
} from '../actions/currentCampground'

const initialState = {
  campgroundNotFound: false,
  selectedCampground: {},
  author: '',
  comments: [],
  loadingSelectedCampground: true,
  commentEditing: false,
  selectedCommentId: '',
  editedCommentId: '',
  addCommentEditing: false,
  newCommentValue: '',
  errors: {
    notAuthor: false
  }
};

function currentCampgroundReducer(state = initialState, action) {
  switch (action.type) {

    case SET_CAMPGROUND_NOT_FOUND:
      return {
        ...state,
        campgroundNotFound: action.isNotFound
      };

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
        loadingSelectedCampground: false
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

    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.commentId)
      };

    case TOGGLE_ADD_COMMENT_EDITING:
      return {
        ...state,
        addCommentEditing: !state.addCommentEditing
      };

    case UPDATE_ADD_COMMENT_FIELD:
      return {
        ...state,
        newCommentValue: action.newValue
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
        newCommentValue: ''
      }

    case SET_NOT_AUTHOR:
      return {
        ...state,
        errors: {
          ...state.errors,
          notAuthor: true,
        }
      }

      case CLEAR_SELECTED_CAMPGROUND:
        return {
          ...state,
          selectedCampground: {},
        }

    default:
      return state;
  }
}

export default currentCampgroundReducer;