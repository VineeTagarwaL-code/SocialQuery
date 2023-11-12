import React from 'react';
import { Navigate } from 'react-router-dom';

function LoginRoute({ isLoggedIn ,children }) {
console.log("call from route" ,isLoggedIn)
  return isLoggedIn ? (

    <Navigate to="/" replace />
  ) : (

    children
  );
}

export default LoginRoute;
