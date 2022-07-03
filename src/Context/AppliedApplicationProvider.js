import React, { useState, useEffect, useContext } from "react";
import { AppliedApplicationContext } from "./CreateStateContaxt";



const AppliedApplicationProvider = ({ children }) => {
   const host = process.env.REACT_APP_BACKEND_HOST
   const [applications, setApplications] = useState([])


   const fetchallapplication = async () => {
      let response = await fetch(`${host}/api/application/appliedapplications`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         }
      })
      response = await response.json()
      if (!response.success) return console.error(response)

      setApplications(response.application)
   }


   const createApplication = async (applyinfo) => {

      const data = await applyinfo;

      console.log(data, 'application data at acreate')

      let response = await fetch(`${host}/api/application/createapplication`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
      })
      response = await response.json()
      if (!response.success) return console.error(response)

       setApplications(applications => [...applications, response.application])


      return response.success
   }

   useEffect(() => {
      fetchallapplication();

      return () => {
         fetchallapplication();
      }
   }, [setApplications])




   return (
      <AppliedApplicationContext.Provider value={{ applications, setApplications, createApplication }}>
         {children}
      </AppliedApplicationContext.Provider>
   )
}

const useAppliedApplication = () => {
   return useContext(AppliedApplicationContext)
}

export { AppliedApplicationProvider, useAppliedApplication } 