import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanner } from '../../../Context/BannerProvider';
import { useOpening } from '../../../Context/OpeningProvider';
import { useTheme } from '../../../Context/ThemeProvider';


const BannerPopUp = () => {
   const navigation = useNavigate()
   const reftoggle = useRef(null)
   const refClose = useRef(null)



   const [jobDescriptionPoints, setJobDescriptionPoints] = useState([])
   const [jobResponsibilityPoints, setJobResponsibilityPoints] = useState([])
   const [mustToHavePoints, setMustToHavePoints] = useState([])




   console.log(jobDescriptionPoints[2])


   const { popUpOpening, setPopUpOpening, eopening, setEopening, copening, setCopening, createOpenings, updateOpenings } = useOpening();
   const { style, setProgress, progress } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;

   const handleonChange = (e) => {
      console.log(popUpOpening, "thisi is popUpOpening")
      if (popUpOpening === "add") {
         setCopening({ ...copening, [e.target.name]: e.target.value })
         console.log("we are in if condition")

      }
      else {
         setEopening({ ...eopening, [e.target.name]: e.target.value })
         console.log(eopening, "this is eopening")
         console.log("we are in else")
         console.log(copening)
      }
   }




   console.log(popUpOpening)


   const handleSubmit = async (e) => {
      e.preventDefault()
      let add = e.target.id
      console.log(copening, "the value")
      if (add === 'add ') {
         const create = await createOpenings(copening)
         console.log('this is working')
         if (!create) return console.log("at handle close")
         // return create
         setCopening({
            title: '',
            discription: '',
            image: '',
         })
         refClose.current.click()
         setProgress(100)

      } else if (e.target.id === 'update ') {
         console.log('this is update')

         const update = await updateOpenings(eopening, e.id)
         console.log('this is res for update', update)
         if (!update) return console.log("at update problem")

         refClose.current.click()

         setEopening({
            etitle: '',
            ediscription: '',
            eimage: '',
         })


      } else {
         console.log("something wrong in if else")

      }
      setProgress(100)
   }





   return (
      <>
         {/* <!-- Button trigger modal --> */}
         <button type="button" className={`btn btn-sm text-${Ntext}  `} data-bs-toggle="modal" data-bs-target={`#${popUpOpening}`}
            onClick={() => setPopUpOpening('add')}
         >

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
               <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
         </button>

         {/* <!-- Modal --> */}
         <div className="modal fade " id={`${popUpOpening}`} tabIndex="-1" aria-labelledby={`${popUpOpening}Label`} aria-hidden="true"  >
            <div className="modal-dialog  modal-xl  " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="exampleModalLabel"><span>{popUpOpening === 'update' ? 'Update Opening' : 'Publish New Opening '}</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} method="post" id={`${popUpOpening} `}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="title" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name={`${popUpOpening === 'add' ? 'title' : "etitle"}`}
                              value={`${popUpOpening === 'add' ? copening.title : eopening?.etitle}`}
                              onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="salary" className="label">Salary</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name={`${popUpOpening === 'add' ? 'salary' : "esalary"}`} onChange={handleonChange}
                              value={`${popUpOpening === 'add' ? copening.salary : eopening?.esalary}`} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="experience" className="label">Experience</label>
                           </div>
                           <input type="number" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name={`${popUpOpening === 'add' ? 'experience' : "eexperience"}`} onChange={handleonChange}
                              value={`${popUpOpening === 'add' ? copening.experience : eopening?.eexperience}`} />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Enter Only Number
                           </span>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="discription" className="label">discription</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 resize-none `} name={`${popUpOpening === 'add' ? 'discription' : "ediscription"}`} onChange={handleonChange}
                              value={`${popUpOpening === 'add' ? copening.discription : eopening?.ediscription}`} >

                           </textarea>
                        </div>


                        {/* job Discrioption */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="jobDiscription" className="label"> jobDescriptionPoints:</label>
                           </div>
                           {jobDescriptionPoints.map((Point, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name={`${popUpOpening === 'add' ? 'experience' : "eexperience"}`} onChange={handleonChange}
                                       // value={`${popUpOpening === 'add' ? copening.experience : eopening?.eexperience}`} 
                                       value={Point}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setJobDescriptionPoints(() => jobDescriptionPoints.filter(e => e !== Point))}>
                                       </button>
                                    </div>

                                 </div>
                              )
                           })}

                           <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => setJobDescriptionPoints([...jobDescriptionPoints, jobDescriptionPoints + 1])}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                           </button>
                        </div>


                        {/* job Responsibility */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="jobResponsibility" className="label"> jobResponsibilityPoints:</label>
                           </div>
                           {jobResponsibilityPoints.map((Point, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name={`${popUpOpening === 'add' ? 'experience' : "eexperience"}`} onChange={handleonChange}
                                       // value={`${popUpOpening === 'add' ? copening.experience : eopening?.eexperience}`} 
                                       value={Point}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setJobResponsibilityPoints(() => jobResponsibilityPoints.filter(e => e !== Point))}>
                                       </button>
                                    </div>

                                 </div>
                              )
                           })}

                           <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => setJobResponsibilityPoints([...jobResponsibilityPoints, jobResponsibilityPoints + 1])}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                           </button>
                        </div>



                        {/* Must To Have */}
                        <div className="field " >
                           <div className="lableDiv">
                              <label htmlFor="mustToHave" className="label"> mustToHavePoints:</label>
                           </div>
                           {mustToHavePoints.map((Point, i) => {
                              return (

                                 <div key={i} className="w-75 my-2  d-flex align-items-center">
                                    <span className="whitespace-nowrap mx-2">Point {i + 1}: </span>
                                    <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1  `} name={`${popUpOpening === 'add' ? 'experience' : "eexperience"}`} onChange={handleonChange}
                                       // value={`${popUpOpening === 'add' ? copening.experience : eopening?.eexperience}`} 
                                       value={Point}
                                    />

                                    <div className="mx-2 d-flex">
                                       <button type="button" className={`btn border-0 btn-sm text-${Ntext} btn-close`} onClick={() => setMustToHavePoints(() => mustToHavePoints.filter(e => e !== Point))}>
                                       </button>
                                    </div>

                                 </div>
                              )
                           })}

                           <button type="button" className={`btn border-0 btn-sm text-${Ntext}`} onClick={() => setMustToHavePoints([...mustToHavePoints, mustToHavePoints + 1])}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                           </button>
                        </div>



                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" id='submit-Opening' className={`btn btn-${Htext}  `}  ><span>{popUpOpening === 'update' ? 'Update' : 'Publish'}</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default BannerPopUp