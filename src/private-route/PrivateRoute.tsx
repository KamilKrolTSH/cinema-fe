// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router";
import { useAuthentication } from "../providers/AuthenticateProvider";

// screen if you're not yet authenticated.
export function PrivateRoute({
  children,
  ...rest
}: {
  children: any;
  path: string;
}) {
  const authentication = useAuthentication();

  console.log(authentication);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
