import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanner } from '../../../Context/BannerProvider';
import { useTheme } from '../../../Context/ThemeProvider';
import storage from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

import './Banner.css'

const BannerPopUp = () => {
   const host = process.env.REACT_APP_BACKEND_HOST
   const navigation = useNavigate()
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;
   const { createBanner, updateBanner, popUpBanner, setPopUpBanner, ebanner, setEbanner, cbanner, setCbanner, bannerImage, setBannerImage, ebannerImage, setEBannerImage, storeImg, inputRef, iprogress, setIprogress, iprogressShow, setIprogressShow } = useBanner();
   const refClose = useRef(null)
   const [loading, setLoading] = useState(true)

   // On Change Handelers 
   const handleInputState = (name, value) => {
      setCbanner((prev) => ({ ...cbanner, [name]: value }))
   }

   const handleonChange = (e) => {
      setCbanner({ ...cbanner, [e.target.name]: e.target.value })
   }


   // Submit Button
   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(false)
      setIprogressShow(true);
      const fileName = new Date().getTime() + cbanner.image.name;
      const storageRef = ref(storage, `/BannerImg/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, cbanner.image);
      uploadTask.on('state_changed', (snapshot) => {
         const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         )
         setIprogress(uploaded)
      }, (error) => { console.log(error) },

         async () => await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            handleInputState('image', downloadURL)
            const response = await createBanner(cbanner, downloadURL)
            console.log(response, 'at handele submit add')
            if (!response.success) return console.log("at handle submit in popUpBanner")
            setCbanner({ title: '', discription: '', image: "" })
            setTimeout(() => {

            }, 500);
            refClose.current.click()
            setLoading(true)
            setIprogress(0)
            setIprogressShow(false)
         }),
      )


   }




   return (
      <>
         <button type="button" className={`btn btn-sm text-${Ntext} `} data-bs-toggle="modal" data-bs-target={`#add`}
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
               <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
         </button>

         <div className="modal fade " id={`add`} tabIndex="-1" aria-labelledby={`addLabel`} aria-hidden="true"  >
            <div className="modal-dialog modal-lg " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="exampleModalLabel"><span>Add New Banner</span></h5>
                     <button type="button" className={`btn-close bg-${Secondary}`} data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} id={`add`}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="title" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Primary} border border-${Ntext} text-${Ntext} p-1`} name='title'
                              value={cbanner.title}
                              onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="discription" className="label">discription</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Primary} border border-${Ntext} text-${Ntext} p-1 resize-none `} name='discription' onChange={handleonChange}
                              value={cbanner.discription} >
                           </textarea>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="image" className="label">Banner image</label>
                           </div>
                           <div className="border w-100 p-1 d-flex  flex-column">

                              <div className="mx-2 d-flex align-items-center justify-content-start  ">
                                 <input accept="image/*" className={`w-100 bg-${Primary} border border-${Ntext} text-${Ntext}  p-1 d-none  `} name='image'
                                    type='file'
                                    ref={inputRef}
                                    onChange={(e) => handleInputState('image', e.currentTarget.files[0])}
                                 />
                                 <button
                                    type="button"
                                    className={`btn btn-${Htext} mx-2`}
                                    onClick={() => inputRef.current.click()}>
                                    Upload
                                 </button>
                                 {iprogressShow && iprogress < 100 && (
                                    <div className={``}>
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
                              {cbanner.image && (
                                 <div className="m-1 mt-2">
                                    <div className="w-100 h-100  position-relative overflow-hidden " >
                                       <img
                                          src={typeof cbanner.image === "string" ? cbanner.image : URL.createObjectURL(cbanner.image)}
                                          alt="file"
                                          className={`w-100 h-100`}
                                       />
                                       <div className="progressMasking" style={{ transform: `translateX(${iprogress * 7.5}px)` }}   ></div>

                                       <div className={`position-absolute top-0 text-white `} style={{ left: '20%' }}>

                                          <div className={` f-1 fw-bold `}>
                                             {cbanner.title}
                                          </div>
                                          <div className={` f-2 fw-500 `}>
                                             {cbanner.discription}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}
                              {(
                                 <div className="m-1 mt-2">
                                    <div className="w-100 h-100  position-relative overflow-hidden " >
                                       <img
                                          src={`https://source.unsplash.com/random/1200x400`}
                                          alt="file"
                                          className={`w-100 h-100`}
                                       />
                                       <div className="progressMasking" style={{ transform: `translateX(${iprogress * 7.5}px)` }}   ></div>

                                       <div className={`position-absolute top-0 text-white `} style={{ left: '20%' }}>

                                          <div className={` f-1 fw-bold `}>
                                             {cbanner.title}
                                          </div>
                                          <div className={` f-2 fw-500 `}>
                                             {cbanner.discription}
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
                        <button type="submit" id='submit-banner' className={`btn btn-${Htext}  `} disabled={loading && typeof cbanner.image === 'object' && cbanner.title.length > 2 && cbanner.discription.length > 2 ? false : true}  ><span>{popUpBanner === 'update' ? 'Update' : 'Post'}</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default BannerPopUp