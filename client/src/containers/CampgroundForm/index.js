import { connect } from 'react-redux';

import { updateCampgroundField } from '../../actions/campgrounds';

// importing presentational component
import CampgroundForm from '../../components/CampgroundForm';

// === mapStateToProps
// if we need to read information from the state
const mapStateToProps = (state) => ({
  // name of the prop to specify: element to get from the state
  title: state.campgrounds.title,
  image: state.campgrounds.image,
  description: state.campgrounds.description,
  country: state.campgrounds.country,
});

// === mapDispatchToProps
// if we need to dispatch actions from the store (modify the state)
const mapDispatchToProps = (dispatch) => ({
  // name of the prop to specify: function which will dispatch the action
  changeField: (newValue, name) => {
    console.log(newValue, name);
    dispatch(updateCampgroundField(newValue, name));
  }
});

// === creating the assistant
// adding withRouter to be able to access params in container
export default connect(mapStateToProps, mapDispatchToProps)(CampgroundForm);