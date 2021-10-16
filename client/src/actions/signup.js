// === action types
export const UPDATE_SIGNUP_FIELD = 'UPDATE_SIGNUP_FIELD';

// === action creators

export const updateSignupField = (newValue, fieldName) => ({
  type: UPDATE_SIGNUP_FIELD,
  newValue: newValue,
  fieldName: fieldName,
});