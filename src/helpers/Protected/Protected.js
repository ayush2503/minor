import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Protected({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        toast.error("Please Sign in to continue!")
        return <Navigate to="/" replace />;
        }
  return (
    children
  )
}

export default Protected