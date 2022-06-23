import React, { useState, useEffect, useContext, useRef } from 'react'

import Contaxt from './CreateStateContaxt'


const StateProvider = ({ children }) => {

   const modalRef = useRef(null)
   const [first, setfirst] = useState("second")
   const [progress, setProgress] = useState(0)
   const [container, setContainer] = useState('Banner');
   const [banner, setBanner] = useState([]);

   const [cbanner, setCbanner] = useState(
      {
         title: '',
         discription: '',
         image: ''
      }
   )
   const [popUpBanner, setPopUpBanner] = useState()
   const [ebanner, setEbanner] = useState({
      etitle: '',
      ediscription: '',
      eimage: ''
   })
   const [bid, setBid] = useState()
   const [totaleResult, setTotaleResult] = useState({
      banner: 0,
      application: 0,
      openings: 0
   })
   const [style, setStyle] = useState({
      // Default Style is White based 

      Htext: "primary",
      Ntext: "dark",
      Primary: "white",
      Secondary: "light",
      invert: 1,
      toggle: "light"
   })

   const toggleTheme = () => {
      if (style.toggle === "light") {
         setStyle({
            ...style,
            Htext: "success",
            Ntext: "white",
            Primary: "dark",
            Secondary: "secondary",
            invert: 0,
            toggle: "dark"
         })
      } else {
         setStyle({
            ...style,
            Htext: "primary",
            Ntext: "dark",
            Primary: "white",
            Secondary: "light",
            invert: 1,
            toggle: "light"
         })
      }
   }

   const modal = async (e) => {
      console.log(modalRef, "<-- modalRef")
   }

   // Banner CRUD 
   const fetchAllBanner = async () => {
      const response = await fetch('http://localhost:5500/api/banner/fetchallbanner', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      const data = await response.json()
      if (!data.success) return alert('banner not found')
      setBanner(data.banner)
      setTotaleResult({ ...totaleResult, banner: data.TotalBannerCount })

   }

   const createBanner = async ({ title, discription }) => {
      setProgress(30)
      const data = { title, discription }

      setProgress(50)
      let response = await fetch('http://localhost:5500/api/banner/createbanner', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `${localStorage.getItem('jwt')}`
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYyYjE5YzVhNjk5YmU3MTRhZDM5MDllNyJ9LCJpYXQiOjE2NTU4MTY5NjB9.hQLdlfX5E-pej7qnDgK0rvULRxuqTDiw_F95luYyPkc"
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      console.log(response.success, "<-- res.success")
      console.log(response.success, "after updating")
      if (!response.success) return alert('banner not found')

      setProgress(90)
      setBanner(banner => [...banner, response.banner])
      setProgress(100)
      return response.success
   }

   const updateBanner = async ({ etitle, ediscription }) => {
      setProgress(30)
      const data = { title: etitle, discription: ediscription }
      setProgress(50)
      let response = await fetch(`http://localhost:5500/api/banner/updatebanner/${bid}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYyYjE5YzVhNjk5YmU3MTRhZDM5MDllNyJ9LCJpYXQiOjE2NTU4MTY5NjB9.hQLdlfX5E-pej7qnDgK0rvULRxuqTDiw_F95luYyPkc"
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      if (!response.success) return alert('banner not found ')
      setProgress(90)
      console.log(ebanner, "this it")
      // setEbanner(banner => [...banner, response.banner])
      // banner.forEach(e => {
      //    console.log(e)
      //    if (e._id === bid) { console.log("ebanner") }
      // });

      banner.map(e => {
         if (e._id === bid) {
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

   const deleteBanner = async (id) => {
      setProgress(30)
      let ask = window.confirm("are you sure you want to delete this banner?")
      if (!ask) return ask
      console.log(ask)
      setProgress(50)
      console.log(bid)
      let response = await fetch(`http://localhost:5500/api/banner/deletebanner/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYyYjE5YzVhNjk5YmU3MTRhZDM5MDllNyJ9LCJpYXQiOjE2NTU4MTY5NjB9.hQLdlfX5E-pej7qnDgK0rvULRxuqTDiw_F95luYyPkc"
         }
      })
      setProgress(70)
      response = await response.json()
      console.log(response, 'this is a json response')
      if (!response.success) return alert('banner not found ')
      setProgress(90)
      console.log(ebanner, "this it")


      setProgress(100)
      return response.success

   }

   useEffect(() => {
      fetchAllBanner()
      // return () => {
      //    fetchAllBanner()
      // }
      // setProgress(100)
   }, [setBanner])

 


   return (
      <Contaxt.Provider value={{ first, setfirst, style, setStyle, toggleTheme, container, setContainer, fetchAllBanner, banner, createBanner, progress, setProgress, cbanner, setCbanner, totaleResult, setTotaleResult, deleteBanner, updateBanner, modalRef, modal, popUpBanner, setPopUpBanner, ebanner, setEbanner, bid, setBid }}>
         {children}
      </Contaxt.Provider>
   )
}

const useStateProvider = () => {
   const context = useContext(Contaxt)
   return context
}



export { useStateProvider, StateProvider }