import { connect } from 'react-redux';

import {
  fetchSelectedCampground,
  submitEditedCampground,
  updateEditField
 } from '../../actions/currentCampground'

// importing presentational component
import EditCampgroundForm from '../../components/campgrounds/EditCampgroundForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  selectedCampground: state.currentCampground.selectedCampground,
  loadingCampgroundId: state.newCampground.loadingCampgroundId
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  loadSelectedCampground: (id) => {
    dispatch(fetchSelectedCampground(id));
  },
  changeField: (newValue, name) => {
    dispatch(updateEditField(newValue, name));
  },
  submitEditedCampground: (campgroundId) => {
    dispatch(submitEditedCampground(campgroundId));
  },
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(EditCampgroundForm);