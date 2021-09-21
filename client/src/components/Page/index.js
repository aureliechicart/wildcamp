import { Route } from "react-router-dom";

import "./page.scss";

import Home from "../Home";
import Campground from "../Campground";

const Page = () => (
  <div className="page">
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/campground/122">
      <Campground />
    </Route>
  </div>
);

export default Page;
