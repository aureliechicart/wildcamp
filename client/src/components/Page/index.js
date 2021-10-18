import { Route, Switch } from "react-router-dom";

import "./page.scss";

import Home from "../../containers/Home";
import SignupForm from "../../containers/SignupForm";
import LoginForm from "../../containers/LoginForm";
import Campground from "../../containers/Campground";
import NewCampgroundForm from "../../containers/NewCampgroundForm";
import EditCampgroundForm from "../../containers/EditCampgroundForm";
import NotFound from "../../containers/NotFound";

const Page = () => {

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
