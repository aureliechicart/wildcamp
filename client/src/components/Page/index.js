import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

import "./page.scss";

import Home from "../Home";
import Campground from "../Campground";

const Page = ({ campgrounds }) => {
  // console.log(campgrounds);

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
};

Page.propTypes = {
  campgrounds: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired
      }).isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          author: PropTypes.shape({
            username: PropTypes.string.isRequired
          }).isRequired,
        }))
    }).isRequired,
  ).isRequired,
};

export default Page;
