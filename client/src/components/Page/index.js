import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

import "./page.scss";

import Home from "../../containers/Home";
import Campground from "../../containers/Campground";
import NewCampgroundForm from "../../containers/NewCampgroundForm";
import EditCampgroundForm from "../../containers/EditCampgroundForm";

const Page = ({ campgrounds }) => {
  // console.log(campgrounds);

  return (
    <div className="page">
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/campground/:id">
        <Campground />
      </Route>
      <Route path="/new-campground">
        <NewCampgroundForm />
      </Route>
      <Route path="/edit-campground/:id">
        <EditCampgroundForm />
      </Route>
    </div>
  );
};

Page.propTypes = {
  campgrounds: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Page;
