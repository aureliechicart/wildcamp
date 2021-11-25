import { connect } from 'react-redux';

// importing presentational component
import ProtectedRoute from '../../components/ProtectedRoute';

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
  
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);