// src/utils/PrivateRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * PrivateRoute
 * Protects routes that require authentication.
 */
function PrivateRoute({ component: Component, ...rest }) {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/authentication/sign-in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
