import { connect } from 'react-redux';

import { setBannerDisplay } from '../../actions/auth';

// importing presentational component
import Page from '../../components/layout/Page';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  campgrounds: state.campgrounds.campgroundsList,
  isAuthenticated: state.auth.isAuthenticated,
  bannerDisplayed: state.auth.bannerDisplayed,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  setBannerDisplay: (value) => {
    dispatch(setBannerDisplay(value));
  },
});

// === creating the assistant
export default connect(mapStateToProps, mapDispatchToProps)(Page);