import { connect } from 'react-redux';
import { submitLogout } from '../../actions/auth';
import { setBannerDisplay } from '../../actions/campgrounds';

// importing presentational component
import Navbar from '../../components/Navbar';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  isAuthenticated: state.auth.isAuthenticated,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  submitLogout: () => {
    dispatch(submitLogout());
  },
  setBannerDisplay: (value) => {
    dispatch(setBannerDisplay(value));
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);