// === action types

export const FETCH_SELECTED_CAMPGROUND = 'FETCH_SELECTED_CAMPGROUND';
export const SAVE_SELECTED_CAMPGROUND = 'SAVE_SELECTED_CAMPGROUND';
export const SET_CAMPGROUND_NOT_FOUND = 'SET_CAMPGROUND_NOT_FOUND';

export const SAVE_AUTHOR = 'SAVE_AUTHOR';
export const SAVE_COMMENTS = 'SAVE_COMMENTS';

export const TOGGLE_LOADING_SELECTED_CAMPGROUND = 'TOGGLE_LOADING_SELECTED_CAMPGROUND';

// campground edition
export const SUBMIT_EDITED_CAMPGROUND = 'SUBMIT_EDITED_CAMPGROUND';
export const UPDATE_EDIT_FIELD = 'UPDATE_EDIT_FIELD';

// campground deleting
export const DELETE_SELECTED_CAMPGROUND = 'DELETE_SELECTED_CAMPGROUND';
export const TOGGLE_CAMPGROUND_DELETED = 'TOGGLE_CAMPGROUND_DELETED';

// campground comment edition
export const UPDATE_EDIT_COMMENT_FIELD = 'UPDATE_EDIT_COMMENT_FIELD';

export const TOGGLE_COMMENT_EDITING = 'TOGGLE_COMMENT_EDITING';
export const SUBMIT_EDITED_COMMENT = 'SUBMIT_EDITED_COMMENT';
export const SAVE_EDITED_COMMENT_ID = 'SAVE_EDITED_COMMENT_ID';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

// campground comment adding
export const TOGGLE_ADD_COMMENT_EDITING = 'TOGGLE_ADD_COMMENT_EDITING';
export const UPDATE_ADD_COMMENT_FIELD = 'UPDATE_ADD_COMMENT_FIELD';
export const SUBMIT_NEW_COMMENT = 'SUBMIT_NEW_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';


// === action creators

export const fetchSelectedCampground = (id) => ({
  type: FETCH_SELECTED_CAMPGROUND,
  id: id,
});

export const setCampgroundNotFound = (isNotFound) => ({
  type: SET_CAMPGROUND_NOT_FOUND,
  isNotFound: isNotFound
});

export const saveSelectedCampground = (selectedCampground) => ({
  type: SAVE_SELECTED_CAMPGROUND,
  selectedCampground: selectedCampground,
});

export const saveAuthor = (author) => ({
  type: SAVE_AUTHOR,
  author: author,
});

export const saveComments = (comments) => ({
  type: SAVE_COMMENTS,
  comments: comments,
});

export const toggleLoadingSelectedCampground = () => ({
  type: TOGGLE_LOADING_SELECTED_CAMPGROUND,
});

export const updateEditField = (newValue, fieldName) => ({
  type: UPDATE_EDIT_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});

export const toggleCommentEditing = (commentId) => ({
  type: TOGGLE_COMMENT_EDITING,
  commentId: commentId
});

export const submitEditedCampground = (campgroundId) => ({
  type: SUBMIT_EDITED_CAMPGROUND,
  campgroundId: campgroundId
});

export const submitEditedComment = (commentId) => ({
  type: SUBMIT_EDITED_COMMENT,
  commentId: commentId
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId: commentId
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId: commentId
});


export const updateEditCommentField = (newValue, commentId) => ({
  type: UPDATE_EDIT_COMMENT_FIELD,
  newValue: newValue,
  commentId: commentId
});

export const saveEditedCommentId = (editedCommentId) => ({
  type: SAVE_EDITED_COMMENT_ID,
  editedCommentId: editedCommentId
});

export const toggleAddCommentEditing = () => ({
  type: TOGGLE_ADD_COMMENT_EDITING
});

export const updateAddCommentField = (newValue) => ({
  type: UPDATE_ADD_COMMENT_FIELD,
  newValue: newValue
});

export const submitNewComment = (campgroundId) => ({
  type: SUBMIT_NEW_COMMENT,
  campgroundId: campgroundId
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment: comment
});

export const deleteSelectedCampground = (campgroundId) => ({
  type: DELETE_SELECTED_CAMPGROUND,
  campgroundId: campgroundId
});

export const toggleCampgroundDeleted = () => ({
  type: TOGGLE_CAMPGROUND_DELETED,
});