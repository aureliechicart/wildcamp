import React from "react";
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuthenticated }) => {
  return (
    <Route render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />
      } else {
        return (
          <Redirect to={{
            pathname: "/login",
            state: {
              from: props.location
            }}
          }
          />
        );
      }
    }}
    />
  )
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default ProtectedRoute;