import React from "react";
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route render={(props) => {
      console.log('hello');
      if (isAuthenticated) {
        console.log(props);
        return <Component {...props} />
      } else {
        console.log('coucou');
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

export default ProtectedRoute;