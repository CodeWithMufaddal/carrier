import React, { useState, useEffect, useContext, useRef } from "react";
import { OpenningContext } from "./CreateStateContaxt";
import { useTheme } from "./ThemeProvider";


const OpeningProvider = ({ children }) => {

   const host = process.env.REACT_APP_BACKEND_HOST
   const [jobDescription, setJobDescription] = useState([{ JD: '' }])

   const [jobResponsibility, setJobResponsibility] = useState([{ JR: '' }])
   const [mustToHave, setMustToHave] = useState([{ MTH: '' }])

   const { progress, setProgress } = useTheme()

   const [opening, setOpening] = useState([]);
   const [oid, setOid] = useState()

   const [copening, setCopening] = useState({
      title: "",
      salary: "",
      experience: "",
      description: "",
      jobDescription: [{ JD: '' }],
      jobResponsibility: [{ JR: '' }],
      mustToHave: [{ MTH: '' }]
   })

   const [eopening, setEopening] = useState({

      etitle: "",
      esalary: "",
      eexperience: "",
      edescription: "",
      ejobDescription: [{ JD: '' }],
      ejobResponsibility: [{ JR: '' }],
      emustToHave: [{ MTH: '' }]

   })

   const [popUpOpening, setPopUpOpening] = useState()

   const handelupdateOpening = (opening) => {
      setEopening({
         etitle: opening.title,
         esalary: opening.salary,
         eexperience: opening.experience,
         edescription: opening.description,
         ejobDescription: opening.jobDescription,
         ejobResponsibility: opening.jobResponsibility,
         emustToHave: opening.mustToHave
      })
      setOid(opening._id)

   }






   // CRUD OF Openings

   const fetchAllOpenings = async () => {
      let response = await fetch(`${host}/api/opening/fetchallopening`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      response = await response.json()
      if (!response.success) return alert('Problem in fetchAllOpenings')
      setOpening(response.opening)
   }

   const createOpenings = async () => {
      setProgress(30)
      const data = copening
      console.log(data)
      setProgress(50)
      let response = await fetch(`${host}/api/opening/createopening`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      if (!response.success) return alert('Invalide Input at create opening ')

      setProgress(90)
      setOpening(opening => [...opening, response.opening])

      setProgress(100)
      return response.success
   }

   const updateOpenings = async ({
      etitle,
      esalary,
      eexperience,
      edescription,
      ejobDescription,
      ejobResponsibility,
      emustToHave


   }) => {
      setProgress(30)

      const data = {
         title: etitle,
         salary: esalary,
         experience: eexperience,
         description: edescription,
         jobDescription: ejobDescription,
         jobResponsibility: ejobResponsibility,
         mustToHave: emustToHave
      }

      setProgress(50)
      console.log(oid)
      let response = await fetch(`${host}/api/opening/updateopening/${oid}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      console.log(response)
      if (!response.success) return alert('Opening  not found ')
      setProgress(90)

      opening.map(e => {
         if (e._id === oid) {
            return (
               e.title = data.title,
               e.salary = data.salary,
               e.experience = data.experience,
               e.description = data.description,
               e.jobDescription = data.jobDescription,
               e.jobResponsibility = data.jobResponsibility,
               e.mustToHave = data.mustToHave
            )
         }
      }
      )
      await fetchAllOpenings()
      setProgress(100)
      return response.success
   }

   const deleteOpenings = async (id) => {
      let ask = window.confirm("are you sure you want to delete this banner?")
      if (!ask) return ask
      setProgress(50)
      let response = await fetch(`${host}/api/opening/deleteopening/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         }
      })
      setProgress(70)
      response = await response.json()
      console.log(response, 'this is a json response')
      if (!response.success) {
         alert('can not delete Opening  not found ')
         setProgress(100)
      }
      setProgress(100)

      await fetchAllOpenings()

      setProgress(100)
      return response.success

   }



   useEffect(() => {
      fetchAllOpenings()

      return () => {
         fetchAllOpenings()
      }
   }, [setCopening])



   return (
      <OpenningContext.Provider value={{
         opening, setOpening, popUpOpening, setPopUpOpening, handelupdateOpening, eopening, setEopening, copening, setCopening, fetchAllOpenings, createOpenings, updateOpenings, deleteOpenings,
         jobDescription, setJobDescription, jobResponsibility, setJobResponsibility, mustToHave, setMustToHave
      }}>
         {children}
      </OpenningContext.Provider>
   )
}

const useOpening = () => {
   return useContext(OpenningContext)
}

export { OpeningProvider, useOpening } 