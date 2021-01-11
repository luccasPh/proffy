import React from 'react';
import {
  Route as RRDRoute,
  RouteProps as RRDRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RRDRouteProps {
  isPrivate?: boolean;
  isPublic?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isPublic = false,
  component: Component,
  ...rest
}) => {
  const { auth } = useAuth();

  return (
    <RRDRoute
      {...rest}
      render={({ location }) => {
        return isPublic || isPrivate === !!auth.token ? (
          <Component />
        ) : (
          <Redirect
            to={
              isPrivate
                ? {
                    pathname: '/signin',
                    state: { from: location },
                  }
                : {
                    pathname: '/',
                    state: { from: location },
                  }
            }
          />
        );
      }}
    />
  );
};

export default Route;
