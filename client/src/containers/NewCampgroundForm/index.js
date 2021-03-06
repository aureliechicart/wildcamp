import { connect } from 'react-redux';

import {
  submitCampground,
  updateCampgroundField,
  setNewCampgroundError
} from '../../actions/newCampground';

// importing presentational component
import NewCampgroundForm from '../../components/campgrounds/NewCampgroundForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  title: state.newCampground.title,
  image: state.newCampground.image,
  description: state.newCampground.description,
  country: state.newCampground.country,
  campgroundId: state.newCampground.campgroundId,
  loadingCampgroundId: state.newCampground.loadingCampgroundId,
  errors: state.newCampground.errors
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  changeField: (newValue, name) => {
    dispatch(updateCampgroundField(newValue, name));
  },
  submitCampground: () => {
    dispatch(submitCampground());
  },
  setNewCampgroundError: (fieldName, error) => {
    dispatch(setNewCampgroundError(fieldName, error));
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(NewCampgroundForm);