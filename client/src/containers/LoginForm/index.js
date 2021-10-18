import { connect } from 'react-redux';

import {
  updateLoginField,
  submitLogin,
  setLoginError,
  setIsLoggedIn
} from '../../actions/auth';

// importing presentational component
import LoginForm from '../../components/LoginForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
  errors: state.auth.errors
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
  setLoginError: (fieldName, error) => {
    dispatch(setLoginError(fieldName, error));
  },
  setIsLoggedIn: (value) => {
    dispatch(setIsLoggedIn(value));
  }
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);