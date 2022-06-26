import React, { useState, useEffect, useContext } from "react";
import { OpenningContext } from "./CreateStateContaxt";
import { useTheme } from "./ThemeProvider";



const OpeningProvider = ({ children }) => {

   const { progress, setProgress } = useTheme()

   const [opening, setOpening] = useState([{ title: "Opening Context", discription: "Opening discription" }, {
      title: "Setting",
      discription: "Setting discription"
   }]);
   const [copening, setCopening] = useState({ title: "", discription: "" })
   const [eopening, setEopening] = useState({
      title: "",
      discription: "",
   })

   const [popUpOpening, setPopUpOpening] = useState()

   const handelupdateOpening = (opening) => {
      setPopUpOpening('update')

      setEopening({
         etitle: opening.title,
         ediscription: opening.discription
      })

      console.log(popUpOpening)
      if (popUpOpening === 'update') {



      } else if (popUpOpening === 'add') {


      }

      else {
         console.log("something wrong in HandelupdateOpening")
      }
   }


  



   // CRUD OF Openings

   const fetchAllOpenings = async () => {
      const response = await fetch('http://localhost:5500/api/banner/fetchallbanner', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      response = await response.json()
      if (!response.success) return alert('Problem in fetchAllOpenings')
      setOpening(response.banner)
      // setTotaleResult({ ...totaleResult, banner: data.TotalBannerCount })

   }

   const createOpenings = async ({ title, discription }) => {
      setProgress(30)
      const data = { title, discription }

      setProgress(50)
      let response = await fetch('http://localhost:5500/api/banner/createbanner', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `${localStorage.getItem('jwt')}`
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      console.log(response.success, "<-- res.success")
      console.log(response.success, "after updating")
      if (!response.success) return alert('banner not found')

      setProgress(90)
      setOpening(opening => [...opening, response.openings])
      setProgress(100)
      return response.success
   }

   const updateOpenings = async ({ etitle, ediscription }, id) => {
      setProgress(30)

      const data = { title: etitle, discription: ediscription }
      setProgress(50)
      let response = await fetch(`http://localhost:5500/api/banner/updatebanner/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      if (!response.success) return alert('banner not found ')
      setProgress(90)

      opening.map(e => {
         if (e._id === id) {
            return (
               e.title = data.title,
               e.discription = data.discription
            )
         }

      }
      )
      setProgress(100)
      return response.success
   }

   const deleteOpenings = async (id) => {
      let ask = window.confirm("are you sure you want to delete this banner?")
      if (!ask) return ask
      setProgress(50)
      let response = await fetch(`http://localhost:5500/api/banner/deletebanner/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         }
      })
      setProgress(70)
      response = await response.json()
      console.log(response, 'this is a json response')
      if (!response.success) return alert('banner not found ')
      setProgress(90)

      await fetchAllOpenings()

      setProgress(100)
      return response.success

   }



   return (
      <OpenningContext.Provider value={{
         opening, setOpening, popUpOpening, setPopUpOpening, handelupdateOpening, eopening, setEopening, copening, setCopening,   fetchAllOpenings, createOpenings, updateOpenings, deleteOpenings
      }}>
         {children}
      </OpenningContext.Provider>
   )
}

const useOpening = () => {
   return useContext(OpenningContext)
}

export { OpeningProvider, useOpening } 