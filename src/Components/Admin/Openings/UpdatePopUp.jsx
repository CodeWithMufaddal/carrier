import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOpening } from '../../../Context/OpeningProvider';
import { useTheme } from '../../../Context/ThemeProvider';

const UpdatePopUp = () => {
   const refClose = useRef(null)

   const handleOnChangejobDescription = (i, e) => {
      const jobdesc = { ...eopening }
      jobdesc.ejobDescription[i][e.target.name] = e.target.value
      setEopening(jobdesc)
   }

   const handleOnChangejobResponsibility = (i, e) => {
      const jobrespons = { ...eopening }
      jobrespons.ejobResponsibility[i][e.target.name] = e.target.value
      setEopening(jobrespons)
   }

   const handleOnChangemustToHave = (i, e) => {
      const musttohave = { ...eopening }
      musttohave.emustToHave[i][e.target.name] = e.target.value
      setEopening(musttohave)
   }

   const { eopening, setEopening, copening, setCopening, createOpenings, updateOpenings, jobDescription, setJobDescription, jobResponsibility, setJobResponsibility, mustToHave, setMustToHave, opening, refOpen } = useOpening();
   const { style, setProgress, progress } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;

   const handleonChange = (e) => {
      setEopening({ ...eopening, [e.target.name]: e.target.value })
   }



   const handleSubmit = async (e) => {
      e.preventDefault()

      eopening.ejobDescription = eopening.ejobDescription.filter(e => e.JD !== '')
      eopening.ejobResponsibility = eopening.ejobResponsibility.filter(e => e.JR !== '');
      eopening.emustToHave = eopening.emustToHave.filter(e => e.MTH !== '')

      const update = await updateOpenings(eopening)
      console.log('this is res for update', update)
      if (!update) return console.log("at update problem")


      setEopening({
         etitle: "",
         esalary: "",
         eexperience: "",
         edescription: "",
         ejobDescription: [{ JD: '' }],
         ejobResponsibility: [{ JR: '' }],
         emustToHave: [{ MTH: '' }]
      })
      refClose.current.click()


      setProgress(100)
   }





   return (
      <>
         {/* <!-- Modal --> */}
         <div className="modal fade " id={`updateopening`} tabIndex="-1" aria-labelledby={`updateopeningLabel`} aria-hidden="true"  >
            <div className="modal-dialog  modal-xl  " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="updateopening"><span>Update Opening</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} method="post" id={`updateopening`}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="etitle" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name='etitle'
                              onChange={handleonChange} value={eopening.etitle} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="esalary" className="label">Salary</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="esalary" onChange={handleonChange} value={eopening.esalary} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="eexperience" className="label">Experience</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="eexperience" onChange={handleonChange} value={eopening.eexperience} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="edescription" className="label">Description</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 resize-none `} name="edescription" onChange={handleonChange} value={eopening.edescription} />
                        </div>


                        {/* job Discrioption */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="ejobDiscription" className="label"> Job Description Points:</label>
                           </div>
                           {eopening.ejobDescription.map((JD, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name="JD" onChange={e => handleOnChangejobDescription(i, e)}
                                       value={JD.JD}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => {
                                          let newopening = { ...eopening }
                                          let check = newopening.ejobDescription.filter((e) => newopening.ejobDescription.length > 1 ? e !== JD : true)
                                          newopening.ejobDescription = check
                                          setEopening(newopening)
                                       }}>
                                       </button>
                                    </div>
                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let open = { ...eopening }
                                       let check = open.ejobDescription
                                       check.splice(i + 1, 0, { JD: '' })
                                       setEopening(open)
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
                           {eopening.ejobResponsibility.map((JR, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name='JR' onChange={e => handleOnChangejobResponsibility(i, e)} value={JR.JR}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => {
                                          let newopening = { ...eopening }
                                          let check = newopening.ejobResponsibility.filter((e) => newopening.ejobResponsibility.length > 1 ? e !== JR : true)
                                          newopening.ejobResponsibility = check
                                          setEopening(newopening)
                                       }}>
                                       </button>
                                    </div>


                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let open = { ...eopening }
                                       let check = open.ejobResponsibility
                                       check.splice(i + 1, 0, { JR: '' })
                                       setEopening(open)
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
                           {console.log(eopening.emustToHave)}
                           {eopening.emustToHave.map((MTH, i) => {
                              return (
                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name='MTH' onChange={e => handleOnChangemustToHave(i, e)}
                                       value={MTH.MTH}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => {
                                          let newopening = { ...eopening }
                                          let check = newopening.emustToHave.filter((e) => newopening.emustToHave.length > 1 ? e !== MTH : true)
                                          newopening.emustToHave = check
                                          setEopening(newopening)
                                       }}>
                                       </button>
                                    </div>

                                    <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => {
                                       let open = { ...eopening }
                                       let check = open.emustToHave
                                       check.splice(i + 1, 0, { MTH: '' })
                                       setEopening(open)
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
                        <button type="submit" id='submit-Opening' className={`btn btn-${Htext}  `}  ><span>update opening</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default UpdatePopUp