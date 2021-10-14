import { connect } from 'react-redux';

import {
  toggleCampgroundNotFound
} from '../../actions/currentCampground'

// importing presentational component
import NotFound from '../../components/NotFound';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  toggleCampgroundNotFound: () => {
    dispatch(toggleCampgroundNotFound());
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);