import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

const Routing = () => {
  let authUser = localStorage.getItem("admin_authToken");
  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path="/admin/dashboard"
          component={Dashboard}
          auth={authUser}
        />       
      </Switch>
    </div>
  );
};

export default Routing;

const PrivateRoute = ({ component: Components, auth, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) =>
        auth ? (
          <Components {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
