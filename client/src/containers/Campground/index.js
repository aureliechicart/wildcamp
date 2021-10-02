import { connect } from 'react-redux';

import { fetchSelectedCampground } from '../../actions/campgrounds';

// importing presentational component
import Campground from '../../components/Campground';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  selectedCampground: state.campgrounds.selectedCampground,
  author: state.campgrounds.author,
  comments: state.campgrounds.comments,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  loadSelectedCampground: (id) => {
    console.log('je suis dans loadSelectedCampground');
    dispatch(fetchSelectedCampground(id));
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(Campground);