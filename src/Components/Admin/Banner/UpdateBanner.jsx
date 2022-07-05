import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanner } from '../../../Context/BannerProvider';
import { useTheme } from '../../../Context/ThemeProvider';
import storage from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import './Banner.css'

const UpdaatePopUp = () => {
   const host = process.env.REACT_APP_BACKEND_HOST
   const navigation = useNavigate()
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;
   const { createBanner, updateBanner, popUpBanner, setPopUpBanner, ebanner, setEbanner, cbanner, banner, setCbanner, einputRef, iprogress, setIprogress, iprogressShow, setIprogressShow, bid } = useBanner();
   const refClose = useRef(null)
   const [loading, setLoading] = useState(true)

   // On Change Handelers 
   const handleInputState = (name, value) => {

      setEbanner((prev) => ({ ...ebanner, [name]: value }))

   }
   const handleonChange = (e) => {
      setEbanner({ ...ebanner, [e.target.name]: e.target.value })
   }

   // Submit Button
   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(false)
      setIprogressShow(true);
      if (typeof ebanner.eimage === 'object') {

         banner.map(b => {
            if (b._id === bid) {
               console.log(b.image, "Please")

               const desertRef = ref(storage, `${b.image}`);

               // Delete the file
               deleteObject(desertRef).then((res) => {
                  console.log(res, "File deleted successfully")
               }).catch((error) => {
                  console.log(error)
               });


               const fileName = new Date().getTime() + ebanner.eimage.name;
               const storageRef = ref(storage, `/BannerImg/${fileName}`)
               const uploadTask = uploadBytesResumable(storageRef, ebanner.eimage);
               uploadTask.on('state_changed', (snapshot) => {
                  const uploaded = Math.floor(
                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  )
                  setIprogress(uploaded)
               }, (error) => { console.log(error) },

                  async () => await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                     handleInputState('eimage', downloadURL)
                     const update = await updateBanner(ebanner, downloadURL)
                     if (!update) return console.log("at update problem")
                     setEbanner({ etitle: '', ediscription: '', eimage: '' })
                     setTimeout(() => { }, 500);
                     refClose.current.click()
                     setLoading(true)
                     setIprogress(0)
                     setIprogressShow(false)
                  }),
               )
            }
         });
         return 
      }


      const update = await updateBanner(ebanner, ebanner.eimage)
      if (!update) return console.log("at update problem")
      setEbanner({ etitle: '', ediscription: '', eimage: '' })
      setTimeout(() => { }, 500);
      refClose.current.click()
      setLoading(true)
      setIprogress(0)
      setIprogressShow(false)


   }


   return (
      <>
         <div className="modal fade " id={`update`} tabIndex="-1" aria-labelledby={`updateLabel`} aria-hidden="true"  >
            <div className="modal-dialog modal-lg " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="exampleModalLabel"><span>Update Banner</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} id={`update`}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="title" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="etitle"
                              value={ebanner?.etitle}
                              onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="discription" className="label">discription</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 resize-none `} name="ediscription" onChange={handleonChange}
                              value={ebanner?.ediscription} >
                           </textarea>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="image" className="label">Banner image</label>
                           </div>
                           <div className="border w-100 p-1 d-flex  flex-column">

                              <div className="mx-2 d-flex align-items-center justify-content-start  ">
                                 <input accept="image/*" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 d-none  `} name="eimage"
                                    type='file'
                                    ref={einputRef}
                                    onChange={(e) => handleInputState('eimage', e.currentTarget.files[0])}
                                 />
                                 <button
                                    type="button"
                                    className={`btn btn-${Htext} mx-2`}
                                    onClick={() => einputRef.current.click()}>
                                    Upload
                                 </button>

                                 {iprogressShow && iprogress < 100 && (
                                    <div className={`mx-1`}>
                                       <span>{iprogress}%</span>
                                    </div>
                                 )}

                                 {iprogress === 100 && (
                                    <div className={`w-25 h-25 mx-2`} style={{ width: '25px' }}>
                                       <span className="w-100 h-100">
                                          <img src="/successCheck.gif " alt="" className="w-25" />
                                       </span>
                                    </div>
                                 )}
                              </div>
                              {ebanner.eimage && (
                                 <div className="m-1 mt-2">
                                    <div className="w-100 h-100  position-relative overflow-hidden " >
                                       <img
                                          src={typeof ebanner.eimage === "string" ? ebanner.eimage : URL.createObjectURL(ebanner.eimage)}
                                          // value={`${popUpBanner === 'add' ? cbanner.image : ebanner?.eimage}`}
                                          alt="file"
                                          className={`w-100 h-100`}
                                       />
                                       <div className="progressMasking" style={{ transform: `translateX(${iprogress * 7.5}px)` }}   ></div>

                                       <div className={`position-absolute top-0 text-white `} style={{ left: '20%' }}>

                                          <div className={` f-1 fw-bold `}>
                                             {ebanner.etitle}
                                          </div>
                                          <div className={` f-2 fw-500 `}>
                                             {ebanner.ediscription}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Only image  are allowed
                           </span>
                        </div>

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" id='submit-banner' className={`btn btn-${Htext}  `} ><span>Update</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default UpdaatePopUp