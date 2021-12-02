import React from "react";
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  isAuthenticated,
  children,
  ...restOfProps
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  // I wanted to use the state info isAuthenticated as a condition for Portected Routes,
  // but if the logged in user refreshes the page, the app loses the state,
  // isAuthenticated appears false and the user is incorrectly redirected to login then home
  // I will therefore use the info in localStorage because it persists even on refresh
  return (
    <Route
      {...restOfProps}
      render={({ location }) => {
        if (user) {
          return (children);
        } else {
          console.log('redirect ', isAuthenticated);
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }}
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