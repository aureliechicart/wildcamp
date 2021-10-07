import { connect } from 'react-redux';

import { submitEditedCampground } from '../../actions/newCampground';
import { updateEditField } from '../../actions/campgrounds'

// importing presentational component
import EditCampgroundForm from '../../components/EditCampgroundForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  selectedCampground: state.campgrounds.selectedCampground,
  campgroundId: state.newCampground.campgroundId,
  loadingCampgroundId: state.newCampground.loadingCampgroundId
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
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