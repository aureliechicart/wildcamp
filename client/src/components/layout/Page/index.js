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
  bannerDisplayed,
  setBannerDisplay
}) => {


  return (
    <div className="page">
      {(!isAuthenticated && bannerDisplayed) &&
        <div className="login-cta">
          <p className="login-cta-description">
            Pour profiter de toutes les possibilités de publication, n'hésitez pas à vous connecter&nbsp;!</p>
          <div className="login-cta-buttons">
            <Link className="button signup" to="/signup">S'inscrire</Link>
            <Link className="button login" to="/login">Se connecter</Link>
            <span className="button skip" onClick={() => { setBannerDisplay(false) }}>Ignorer</span></div>
        </div>
      }
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
        <Route path="/campground/:id">
          <Campground />
        </Route>
        <ProtectedRoute
        path="/new-campground"
        component={NewCampgroundForm}>
        </ProtectedRoute>
        <ProtectedRoute path="/edit-campground/:id"
        component={EditCampgroundForm}>
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
  bannerDisplayed: PropTypes.bool.isRequired,
  setBannerDisplay: PropTypes.func.isRequired
}

export default Page;
