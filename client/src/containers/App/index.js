import { connect } from 'react-redux';

import { fetchCampgrounds } from '../../actions/campgrounds';
import { checkUser } from '../../actions/auth';

// we import the presentational component
import App from '../../components/App';

// === mapStateToProps
const mapStateToProps = (state) => ({
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  loadCampgrounds: () => {
    dispatch(fetchCampgrounds());
  },
  checkUser: () => {
    dispatch(checkUser());
  }
});

// === creating assistant
export default connect(mapStateToProps, mapDispatchToProps)(App);