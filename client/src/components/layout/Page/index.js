import { Route, Switch, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "./page.scss";

import Home from "../../../containers/Home";
import SignupForm from "../../../containers/SignupForm";
import LoginForm from "../../../containers/LoginForm";
import Campground from "../../../containers/Campground";
import NewCampgroundForm from "../../../containers/NewCampgroundForm";
import EditCampgroundForm from "../../../containers/EditCampgroundForm";
import ProtectedRoute from "../../../containers/ProtectedRoute";
import NotFound from "../../../containers/NotFound";


const Page = ({
  isAuthenticated,
}) => {


  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/campground/:id">
          <Campground />
        </Route>
        <ProtectedRoute
          path="/new-campground">
          <NewCampgroundForm />
        </ProtectedRoute>
        <ProtectedRoute exact path="/edit-campground/:id">
          <EditCampgroundForm />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

Page.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Page;
