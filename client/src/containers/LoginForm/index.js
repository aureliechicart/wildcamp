import { connect } from 'react-redux';

import {
  updateLoginField,
  submitLogin,
  setIsFormValid,
  setError,
  clearValidity
} from '../../actions/auth';

// importing presentational component
import LoginForm from '../../components/auth/LoginForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  email: state.auth.email,
  password: state.auth.password,
  isAuthenticated: state.auth.isAuthenticated,
  isFormValid: state.auth.isFormValid,
  apiErrorMessage: state.auth.apiErrorMessage
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  changeField: (newValue, name) => {
    dispatch(updateLoginField(newValue, name));
  },
  submitLogin: () => {
    dispatch(submitLogin());
  },
  setError: (fieldName, error) => {
    dispatch(setError(fieldName, error));
  },
  setIsFormValid: (newValue) => {
    dispatch(setIsFormValid(newValue));
  },
  clearValidity: (fieldName) => {
    dispatch(clearValidity(fieldName));
  }
  
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);