import { connect } from 'react-redux';
import { clearAddCamgroundForm } from '../../actions/newCampground';

// importing presentational component
import Home from '../../components/campgrounds/Home';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  campgrounds: state.campgrounds.campgroundsList,
  loadingCampgrounds: state.campgrounds.loadingCampgrounds,
  isAuthenticated: state.auth.isAuthenticated,
  bannerDisplayed: state.campgrounds.bannerDisplayed
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  clearAddCamgroundForm: () => {
    dispatch(clearAddCamgroundForm());
  }
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(Home);