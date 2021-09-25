import { connect } from 'react-redux';

// importing presentational component
import Campground from '../../components/Campground';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  campgrounds: state.campgrounds.campgroundsList,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(Campground);