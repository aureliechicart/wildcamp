import { connect } from 'react-redux';

import { submitCampground, updateCampgroundField } from '../../actions/newCampground';

// importing presentational component
import CampgroundForm from '../../components/CampgroundForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  title: state.newCampground.title,
  image: state.newCampground.image,
  description: state.newCampground.description,
  country: state.newCampground.country,
  campgroundId: state.newCampground.campgroundId,
  loadingCampgroundId: state.newCampground.loadingCampgroundId
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
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(CampgroundForm);