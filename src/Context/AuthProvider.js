import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from './CreateStateContaxt'

const AuthProvider = ({ children }) => {
   const [Admin, setAdmin] = useState(false)
   const [credentials, setCredentials] = useState({
      email: '',
      password: ''
   })

   const Login = async ({ email, password }) => {
      const data = { email: email, password: password }

      let response = await fetch('http://localhost:5500/api/admin/login', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify(data)
      })
      response = await response.json()
      console.log(response, "response")
      if (!response.success) return response.success
      localStorage.setItem('token', response.token)
      setAdmin(response.success)
     
      return response.success


   }
   return (

      <AuthContext.Provider value={{ Login, Admin, setAdmin, credentials, setCredentials }}>
         {children}
      </AuthContext.Provider>
   )

}

const useAuth = () => {
   const Auth = useContext(AuthContext)
   return Auth
}


export { AuthProvider, useAuth }