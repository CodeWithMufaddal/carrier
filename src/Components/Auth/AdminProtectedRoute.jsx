import React from 'react'
import { Navigate } from 'react-router-dom'

// import { useAuth } from '../../Context/AuthProvider'

const AdminProtectedRoute = ({ children }) => {
   const token = localStorage.getItem('token')
   if (!token ) {
      return <Navigate to="/admin/login" ></Navigate>;
   }

   return children;
};

export default AdminProtectedRoute