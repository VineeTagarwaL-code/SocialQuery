import React, { useEffect, useState } from 'react';
import { Navigate, Routes } from 'react-router-dom';

function MainRoute({ isLoggedIn ,children }) {

  return isLoggedIn ? (

    children
  ) : (

    <Navigate to="/login" replace />
  );
}

export default MainRoute;
