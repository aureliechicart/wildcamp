import { connect } from 'react-redux';
import { setIsAuthenticated, submitLogout } from '../../actions/auth';

// importing presentational component
import Navbar from '../../components/layout/Navbar';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  isAuthenticated: state.auth.isAuthenticated,
  loggedInUser: state.auth.loggedInUser
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  submitLogout: () => {
    dispatch(submitLogout());
  },
  setIsAuthenticated: (value) => {
    dispatch(setIsAuthenticated(value));
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);