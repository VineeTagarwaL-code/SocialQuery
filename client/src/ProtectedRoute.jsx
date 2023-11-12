import React from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
function ProtectedRoute({ isLoggedIn , children }) {

     if(isLoggedIn === null ){
        return <Navigate to="/login" replace />;
     }
     return children;

}

export default ProtectedRoute