import React, { Fragment } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface IAuthProtectedProps {
  hasLogin: boolean;
  children?: React.ReactNode;
  redirectTo: string;
}

const AuthProtected: React.FunctionComponent<IAuthProtectedProps> = (props) => {
  const { children, hasLogin, redirectTo } = props;
  if (!hasLogin) {
    return (
      <Fragment>
        <Navigate to={redirectTo} replace />
      </Fragment>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthProtected;
