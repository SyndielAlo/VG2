import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './pages/auth/authprovider';

function PrivateRoute({ element, ...rest }) {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? (
    <Route {...rest}> {/* Spread the rest of the props for Route */}
      {element}  {/* Render the protected component (DashboardPage) */}
    </Route>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
