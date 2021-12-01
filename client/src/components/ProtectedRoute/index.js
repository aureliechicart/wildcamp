import React from "react";
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          return (
            <Redirect to="/login"
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