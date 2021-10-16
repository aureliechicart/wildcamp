import { connect } from 'react-redux';

import { updateSignupField } from '../../actions/signup';

// importing presentational component
import SignupForm from '../../components/SignupForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  email: state.signup.email,
  username: state.signup.username,
  password: state.signup.password,
  passwordConfirm: state.signup.passwordConfirm,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  changeField: (newValue, name) => {
    dispatch(updateSignupField(newValue, name));
  },
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);