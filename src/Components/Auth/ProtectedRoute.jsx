import React from 'react'
import { useAuth } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
   const Navigate = useNavigate()

   const { Login } = useAuth()



   return children
}

export default ProtectedRoute