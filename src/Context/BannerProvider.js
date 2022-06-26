import React, { useState, useEffect, useContext, useRef } from 'react'

import { BannerContaxt } from './CreateStateContaxt'
import { useTheme } from './ThemeProvider'

const BannerProvider = ({ children }) => {

   const { progress, setProgress } = useTheme()

   const modalRef = useRef(null)
   const [first, setfirst] = useState("second")

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
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(70)
      response = await response.json()
      if (!response.success) return alert('banner not found ')
      setProgress(90)
      console.log(ebanner, "this it")

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

      await fetchAllBanner()

      setProgress(100)
      return response.success

   }

   useEffect(() => {
      fetchAllBanner()
      // localStorage.setItem("style", 'light')

      return () => {
         setProgress(100)
         fetchAllBanner()
      }
   }, [setBanner])


   return (
      <BannerContaxt.Provider value={{ first, setfirst, container, setContainer, fetchAllBanner, banner, createBanner, progress, setProgress, cbanner, setCbanner, totaleResult, setTotaleResult, deleteBanner, updateBanner, modalRef, modal, popUpBanner, setPopUpBanner, ebanner, setEbanner, bid, setBid }}>
         {children}
      </BannerContaxt.Provider>
   )
}

const useBanner = () => {
   const context = useContext(BannerContaxt)
   return context
}



export { BannerProvider, useBanner }