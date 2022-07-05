import React, { useState, useEffect, useContext, useRef } from "react";
import { AppliedApplicationContext } from "./CreateStateContaxt";



const AppliedApplicationProvider = ({ children }) => {
   const host = process.env.REACT_APP_BACKEND_HOST
   const [applications, setApplications] = useState([])
   const [loading, setLoading] = useState(true)
   const inputRef = useRef();
   const [iprogress, setIprogress] = useState(0)
   const [iprogressShow, setIprogressShow] = useState(false)
   const [sortby, setSortby] = useState('Most relevant')
   const [applyinfo, setApplyinfo] = useState({

      openingId: '',
      title: '',
      name: '',
      phone: Number,
      email: '',
      cv: '',
      cLeter: ''

   })







   // C.R. operations
   const fetchallapplication = async () => {
      setSortby('Most relevant')

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


   const createApplication = async ({ openingId,
      title,
      name,
      phone,
      email,
      cLeter }, downloadURL) => {


      const data = {
         openingId,
         title,
         name,
         phone,
         email,
         cv: downloadURL,
         cLeter
      }

      let response = await fetch(`${host}/api/application/createapplication`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
      })
      response = await response.json()
      if (!response.success) return console.error(response)

      setApplications(applications => [...applications, response.application])
      setApplyinfo({
         openingId: '',
         title: '',
         name: '',
         phone: Number,
         email: '',
         cv: '',
         cLeter: ''
      })

      return response.success
   }



   const handleSortBy = async () => {
      setSortby('Most recent')
      let response = await fetch(`${host}/api/application/appliedapplications/-1`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': localStorage.getItem('token')
            }
         }
      )

      response = await response.json()
      if (!response.success) return console.error(response)
      setApplications(response.application)


   }





   useEffect(() => {
      fetchallapplication();
      setApplyinfo({
         openingId: '',
         title: '',
         name: '',
         phone: Number,
         email: '',
         cv: '',
         cLeter: ''
      })

      return () => {
         fetchallapplication();
      }
   }, [setApplications])




   return (
      <AppliedApplicationContext.Provider value={{ applications, setApplications, createApplication, loading, setLoading, inputRef, iprogress, setIprogress, iprogressShow, setIprogressShow, applyinfo, setApplyinfo, handleSortBy, sortby, setSortby, fetchallapplication, }}>
         {children}
      </AppliedApplicationContext.Provider>
   )
}

const useAppliedApplication = () => {
   return useContext(AppliedApplicationContext)
}

export { AppliedApplicationProvider, useAppliedApplication } 