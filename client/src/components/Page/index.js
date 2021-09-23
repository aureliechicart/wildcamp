import { Route } from "react-router-dom";

import "./page.scss";

import Home from "../Home";
import Campground from "../Campground";

const Page = ({ campgrounds }) => {
  console.log(campgrounds);

  return (
    <div className="page">
      <Route path="/" exact>
        <Home campgrounds={campgrounds} />
      </Route>
      <Route path="/campground/:id">
        <Campground campgrounds={campgrounds}/>
      </Route>
    </div>
  );
}

export default Page;
