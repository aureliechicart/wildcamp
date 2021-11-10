import { Route, Switch, Link } from "react-router-dom";

import "./page.scss";

import Home from "../../containers/Home";
import SignupForm from "../../containers/SignupForm";
import LoginForm from "../../containers/LoginForm";
import Campground from "../../containers/Campground";
import NewCampgroundForm from "../../containers/NewCampgroundForm";
import EditCampgroundForm from "../../containers/EditCampgroundForm";
import NotFound from "../../containers/NotFound";


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
        <Route path="/new-campground">
          <NewCampgroundForm />
        </Route>
        <Route path="/edit-campground/:id">
          <EditCampgroundForm />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default Page;
