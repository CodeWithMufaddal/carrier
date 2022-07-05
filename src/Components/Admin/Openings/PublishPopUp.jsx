import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOpening } from '../../../Context/OpeningProvider';
import { useTheme } from '../../../Context/ThemeProvider';


const PublishPopUp = () => {
   const navigation = useNavigate()
   const reftoggle = useRef(null)
   const refClose = useRef(null)

   const { style, setProgress, progress } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;

   const { popUpOpening, setPopUpOpening, eopening, setEopening, copening, setCopening, createOpenings, updateOpenings, jobDescription, setJobDescription, jobResponsibility, setJobResponsibility, mustToHave, setMustToHave, opening } = useOpening();





   const handleonChange = (e) => {
      setCopening({ ...copening, [e.target.name]: e.target.value })
   }

   const handleOnChangejobDescription = (i, e) => {
      const jobdesc = [...jobDescription]
      jobdesc[i][e.target.name] = e.target.value
      setJobDescription(jobdesc)
   }

   const handleOnChangejobResponsibility = (i, e) => {
      const jobrespons = [...jobResponsibility]
      jobrespons[i][e.target.name] = e.target.value
      setJobResponsibility(jobrespons)
   }

   const handleOnChangemustToHave = (i, e) => {
      const musttohave = [...mustToHave]
      musttohave[i][e.target.name] = e.target.value
      setMustToHave(musttohave)
   }



   const handleSubmit = async (e) => {
      e.preventDefault()
      // let val = [...copening]

      copening.jobDescription = jobDescription.filter(e => e.JD !== '')
      copening.jobResponsibility = jobResponsibility.filter(e => e.JR !== '');
      copening.mustToHave = mustToHave.filter(e => e.MTH !== '')


      const create = await createOpenings(copening)
      if (!create) return console.log("at handle close")

      setJobDescription([{ JD: '' }])
      setJobResponsibility([{ JR: '' }])
      setMustToHave([{ MTH: '' }])


      setCopening({
         title: "",
         salary: "",
         experience: "",
         description: "",
         jobDescription: [{ JD: '' }],
         jobResponsibility: [{ JR: '' }],
         mustToHave: [{ MTH: '' }]
      })

      refClose.current.click()
      console.log(copening, "copening after seting up")
      setProgress(100)
   }





   return (
      <>
         {/* <!-- Button trigger modal --> */}
         <button type="button" className={`btn btn-sm text-${Ntext}  `} data-bs-toggle="modal" data-bs-target={`#publish`}>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
               <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
         </button>

         {/* <!-- Modal --> */}
         <div className="modal fade " id={`publish`} tabIndex="-1" aria-labelledby={`publishLabel`} aria-hidden="true"  >
            <div className="modal-dialog  modal-xl  " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="publish"><span>Publish New Opening</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} method="post" id={`publish`}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="title" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name='title'
                              onChange={handleonChange} value={copening.title} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="salary" className="label">Salary</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="salary" onChange={handleonChange} value={copening.salary} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="experience" className="label">Experience</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="experience" onChange={handleonChange} value={copening.experience} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="description" className="label">Description</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 resize-none `} name="description" onChange={handleonChange} value={copening.description} />
                        </div>


                        {/* job Discrioption */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="jobDiscription" className="label"> Job Description Points:</label>
                           </div>
                           {jobDescription.map((JD, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="JD" onChange={e => handleOnChangejobDescription(i, e)}
                                       value={JD.JD}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setJobDescription(() => jobDescription.filter(e =>  jobDescription.length > 1 ? e !== JD : true))}>
                                       </button>
                                    </div>
                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let val = [...jobDescription]
                                       val.splice(i + 1, 0, { JD: '' })
                                       setJobDescription(val)
                                    }}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                       </svg>
                                    </button>

                                 </div>
                              )
                           })}
                        </div>


                        {/* job Responsibility */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="jobResponsibility" className="label"> Job Responsibility Points:</label>
                           </div>
                           {jobResponsibility.map((JR, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name='JR' onChange={e => handleOnChangejobResponsibility(i, e)} value={JR.JR}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setJobResponsibility(() => jobResponsibility.filter(e =>  jobResponsibility.length > 1 ? e !== JR : true))}>
                                       </button>
                                    </div>


                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let val = [...jobResponsibility]
                                       val.splice(i + 1, 0, { JR: '' })
                                       setJobResponsibility(val)
                                    }}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                       </svg>
                                    </button>
                                 </div>
                              )
                           })}
                        </div>



                        {/* Must To Have */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="mustToHave" className="label"> Must To Have Points:</label>
                           </div>
                           {mustToHave.map((MTH, i) => {
                              return (
                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name='MTH' onChange={e => handleOnChangemustToHave(i, e)}
                                       value={MTH.MTH}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setMustToHave(() => mustToHave.filter(e => jobDescription.length > 1 ? e !== MTH : true))}>
                                       </button>
                                    </div>

                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let val = [...mustToHave]
                                       val.splice(i + 1, 0, { MTH: '' })
                                       setMustToHave(val)
                                    }}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                       </svg>
                                    </button>

                                 </div>
                              )
                           })}
                        </div>



                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" id='submit-Opening' className={`btn btn-${Htext}  `}  ><span>Publish</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default PublishPopUp