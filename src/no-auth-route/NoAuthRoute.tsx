// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router";
import { useAuthentication } from "../providers/AuthenticateProvider";

// screen if you're not yet authenticated.
export function NoAuthRoute({
  children,
  ...rest
}: {
  children: any;
  path: string;
}) {
  const authentication = useAuthentication();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
