import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppliedApplication } from '../../Context/AppliedApplicationProvider';
import { useTheme } from '../../Context/ThemeProvider';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const ApplicationPopUp = ({ opening }) => {
   const refClose = useRef(null);
   const navigate = useNavigate()
   const { style, setProgress } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   const { createApplication, loading, setLoading, inputRef, iprogress, setIprogress, iprogressShow, setIprogressShow, applications, setApplications, applyinfo, setApplyinfo } = useAppliedApplication();


   const handleonChange = (e) => {
      setApplyinfo((apply) => ({ ...applyinfo, [e.target.name]: e.target.value }))
   }



   useEffect(() => {
      setApplyinfo({
         openingId: opening._id,
         title: opening.title,
         name: '',
         phone: Number,
         email: '',
         cv: '',
         cLeter: ''
      })

   }, [setApplications, setApplyinfo])



   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(false)
      setIprogressShow(true);
      const fileName = new Date().getTime() + applyinfo.cv.name;
      const storageRef = ref(storage, `/UserCV/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, applyinfo.cv);
      uploadTask.on('state_changed', (snapshot) => {
         const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         )
         setIprogress(uploaded)
      }, (error) => { console.log(error) },

         async () => await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setApplyinfo((applyinfo) => ({ ...applyinfo, 'cv': downloadURL }))
            const res = await createApplication(applyinfo, downloadURL);
            if (!res) return console.log('recive error at handle submit');

            setApplyinfo(() => ({
               openingId: opening._id,
               title: opening.title,
               name: '',
               phone: Number,
               email: '',
               cv: '',
               cLeter: ''
            }))
            // setTimeout(() => {

            // }, 2000);
            setProgress(100)
            refClose.current.click()
            setLoading(true)
            setIprogress(0)
            setIprogressShow(false)
            window.location.reload()
         }),
      )
   }





   return (
      <>
         {/* <!-- Button trigger modal --> */}
         <button type="button" className={`btn btn-${Htext} mb-3 py-2 px-5`} data-bs-toggle="modal" data-bs-target="#ApplyApplication"
         >
            Apply
         </button>

         {/* <!-- Modal --> */}
         <div className="modal fade    " id="ApplyApplication" tabIndex="-1" aria-labelledby="ApplyApplicationLabel" aria-hidden="true">
            <div className="modal-dialog  " >
               <div className={`modal-content bg-${Primary} `}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="ApplyApplicationLabel">Application for <span>{opening.title}</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={handleSubmit} method="post" id="ApplyApplication">
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="name" className="label">Name</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Primary} text-${Ntext} border border-${Ntext} p-1`} name="name" onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="phone" className="label">Phone</label>
                           </div>
                           <input type="tel" className={`w-100 bg-${Primary} text-${Ntext} border border-${Ntext} p-1`} pattern="[0-9]{10}" name="phone" onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="email" className="label">Email</label>
                           </div>
                           <input type="email" className={`w-100 bg-${Primary} text-${Ntext} border border-${Ntext} p-1`} name="email" onChange={handleonChange} required />
                        </div>


                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="cv" className="label">Resume : </label>
                           </div>
                           <div className="border w-100 p-1 d-flex  flex-column">

                              <div className="mx-2 d-flex align-items-center justify-content-start  ">

                                 <div className="sp">

                                    <input accept=".pdf , .docx" className={`w-100 bg-${Primary} text-${Ntext} border border-${Ntext} p-1 d-none  `} name='cv'
                                       type='file'
                                       ref={inputRef}
                                       onChange={(e) => setApplyinfo({ ...applyinfo, 'cv': e.currentTarget.files[0] })}
                                    />
                                    <button
                                       type="button"
                                       className={`btn btn-${Htext} mx-2`}
                                       onClick={() => inputRef.current.click()}>
                                       Add your Resume
                                    </button>
                                    <span>{applyinfo.cv.name}</span>
                                 </div>

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

                           </div>
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Only .pdf/.docx files are allowed
                           </span>
                        </div>














                        <div className="field w-100  position-relative d-flex flex-column">

                           <div className="lableDiv">
                              <label htmlFor="cLeter" className="label">Cover Letter</label>
                           </div>
                           <textarea name="cLeter" className={` w-100 resize-none textarea  bg-${Primary} text-${Ntext} border border-${Ntext} `} onChange={handleonChange} maxLength="300" />

                           <span className="text-secondary  position-absolute bottom-0" style={{ right: "7px" }}>{300 - applyinfo.cLeter.length} </span>
                        </div>

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" className={`btn btn-${Htext}`} disabled={
                           loading
                              && typeof applyinfo.cv === 'object'
                              && applyinfo.name.length > 2
                              && applyinfo.phone.length > 2
                              && applyinfo.email.length > 2
                              && applyinfo.cLeter.length > 2
                              ? false : true} > Apply </button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default ApplicationPopUp