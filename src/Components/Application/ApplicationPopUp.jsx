import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppliedApplication } from '../../Context/AppliedApplicationProvider';
import { useTheme } from '../../Context/ThemeProvider';

const ApplicationPopUp = ({ opening }) => {
   const refClose = useRef(null);
   const navigate = useNavigate()
   const { createApplication } = useAppliedApplication();
   const { style, setProgress } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   const [applyinfo, setApplyinfo] = useState({
      openingId: opening._id,
      title: opening.title,
      name: '',
      phone: Number,
      email: '',
      cv: '',
      cLeter: ''
   })

   const handleonChange = (e) => {
      setApplyinfo({ ...applyinfo, [e.target.name]: e.target.value })
   }


   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log('submit')
      const res = await createApplication(applyinfo);
      console.log(res, 'let me see what is res')
      if (!res) return console.log('recive error at handle submit');
      
      refClose.current.click()
      setApplyinfo({
         openingId: opening._id,
         title: opening.title,
         name: '',
         phone: Number,
         email: '',
         cv: '',
         cLeter: ''
      })

      setProgress(100)
      navigate(`/application/${opening._id}`)
      console.log(applyinfo)
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
               <div className={`modal-content bg-${Primary}`}>
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
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="name" onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="phone" className="label">Phone</label>
                           </div>
                           <input type="tel" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} pattern="[0-9]{10}" name="phone" onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="email" className="label">Email</label>
                           </div>
                           <input type="email" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="email" onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="cv" className="label">Resume / CV</label>
                           </div>
                           <input type="file" accept=".pdf , .docx" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="cv" onChange={handleonChange} required />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Only .pdf and .docx files are allowed
                           </span>
                        </div>

                        <div className="field w-100  position-relative d-flex flex-column">

                           <div className="lableDiv">
                              <label htmlFor="cLeter" className="label">Cover Letter</label>
                           </div>
                           <textarea name="cLeter" className={` w-100 resize-none textarea  bg-${Secondary} border border-${Ntext} `} onChange={handleonChange} maxLength="300" />

                           <span className="text-secondary  position-absolute bottom-0" style={{ right: "7px" }}>{300 - applyinfo.cLeter.length} </span>
                        </div>

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" className={`btn btn-${Htext}`}>Send</button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default ApplicationPopUp