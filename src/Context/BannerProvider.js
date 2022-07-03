import React, { useState, useEffect, useContext, useRef } from 'react'

import { BannerContaxt } from './CreateStateContaxt'
import { useTheme } from './ThemeProvider'
import storage from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid';

const BannerProvider = ({ children }) => {
   const host = process.env.REACT_APP_BACKEND_HOST

   // For file Upload
   const inputRef = useRef();
   const einputRef = useRef();
   const [iprogress, setIprogress] = useState(0)
   const [iprogressShow, setIprogressShow] = useState(false)


   const { progress, setProgress } = useTheme()
   const [bid, setBid] = useState()

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

   const [totaleResult, setTotaleResult] = useState({
      banner: 0,
      application: 0,
      openings: 0
   })


   // Banner CRUD 
   const fetchAllBanner = async () => {
      const response = await fetch(`${host}/api/banner/fetchallbanner`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      const data = await response.json()
      if (!data.success) return alert('banner not found')
      setBanner(data.banner)
   }


   const createBanner = async ({ title, discription, image }, downloadURL) => {
      setProgress(20)
      const data = { title, discription, image: downloadURL }
      setProgress(40)
      let response = await fetch(`${host}/api/banner/createbanner`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(60)
      response = await response.json()
      if (!response.success) return alert('banner not found this create')
      setProgress(80)
      setBanner(banner => [...banner, response.banner])
      setCbanner({ title: '', discription: '', image: '' })
      setProgress(100)
      return response
   }


   const updateBanner = async ({ etitle, ediscription, eimage }, downloadURL) => {
      setProgress(20)
      const data = { title: etitle, discription: ediscription, image: downloadURL }
      setProgress(40)
      let response = await fetch(`${host}/api/banner/updatebanner/${bid}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         },
         body: JSON.stringify(data)
      })
      setProgress(60)
      response = await response.json()
      if (!response.success) return alert('banner not found ')
      setProgress(80)
      banner.map(e => {
         if (e._id === bid) {
            return (
               e.title = data.title,
               e.discription = data.discription,
               e.image = data.image
            )
         }
      })

      setProgress(100)
      return response.success
   }

   const deleteBanner = async (id) => {

      setProgress(60)
      let response = await fetch(`${host}/api/banner/deletebanner/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
         }
      })
      setProgress(70)
      response = await response.json()
      if (!response.success) return alert('banner not found ')
      setProgress(80)
      await fetchAllBanner()
      setProgress(90)
      return response.success

   }



   useEffect(() => {
      fetchAllBanner()
      setCbanner({ title: '', discription: '', image: '' })
      return () => {
         setProgress(100)
         fetchAllBanner()
      }
   }, [setBanner, setCbanner])


   return (
      <BannerContaxt.Provider value={{
         container, setContainer, fetchAllBanner, banner, createBanner, progress, setProgress, cbanner, setCbanner, totaleResult, setTotaleResult, deleteBanner, updateBanner, popUpBanner, setPopUpBanner, ebanner, setEbanner, bid, setBid,
         inputRef, iprogress, setIprogress, iprogressShow, setIprogressShow, einputRef
      }}>
         {children}
      </BannerContaxt.Provider>
   )
}

const useBanner = () => {
   const context = useContext(BannerContaxt)
   return context
}



export { BannerProvider, useBanner }