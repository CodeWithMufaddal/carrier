import React from 'react'
import './Application.css'
import ApplicationPopUp from './ApplicationPopUp'
import { useTheme } from '../../Context/ThemeProvider';
import { useOpening } from '../../Context/OpeningProvider';
import { useParams } from 'react-router-dom'



const Application = () => {

   const { jobid } = useParams();


   const { opening } = useOpening();
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   window.onload = window.scrollTo(0, 0)

   return (
      opening
         .filter((opening) => opening._id === jobid)
         .map((opening, i) => {
            return (
               <div key={i} className="w-100 my-lg-3 my-2 " >
                  <div className="  page-center">
                     <div className="Application ">
                        <div className="mx-1  border rounded ">
                           <div className="border-bottom px-4 p-2">

                              <div className=" mb-3 mx-2">
                                 <span className={`f-1 text-${Htext} whitespace-nowrap`} >Apply For  <span>{opening.title}</span></span>
                              </div>
                              <div className="fw-bold mb-3">
                                 <div className="my-3 mx-2">

                                    <div className={` text-${Ntext} f-3 whitespace-nowrap `}>
                                       <div className="fw-500 d-flex  ">
                                          <label className="px-1">Salary : </label>
                                          <div className=" px-1">
                                             <span>{opening.salary}</span>L/PA
                                          </div>
                                       </div>
                                    </div>

                                    <div className={` text-${Ntext}`}>
                                       <div className="fw-500 d-flex  f-3 ">
                                          <label className="px-1 whitespace-nowrap">Expireance : </label>
                                          <div className=" px-1 ">
                                             <span>{opening.experience}</span>+ years of experience
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-3">

                              <div className={`text-${Ntext}`}>
                                 <div className=" mb-1  fw-bold">
                                    {opening.jobDescription[0] && <span>JOB DESCRIPTION</span>}
                                 </div>
                                 <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                                    {opening.jobDescription.map((list, i) => {
                                       return (<li key={i} >{list.JD}</li>)
                                    })}
                                 </ol>
                              </div>
                              <div className={`text-${Ntext}`}>
                                 <div className=" mb-1  fw-bold">
                                    {opening.jobResponsibility[0] && <span>JOB RESPONSIBILITIES</span>}
                                 </div>
                                 <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                                    {opening.jobResponsibility.map((list, i) => {
                                       return (<li key={i} >{list.JR}</li>)

                                    })}
                                 </ol>
                              </div>

                              <div className={`text-${Ntext}`}>
                                 <div className=" mb-1  fw-bold">
                                    {opening.mustToHave[0] && <span >MUST TO HAVE</span>}
                                 </div>
                                 <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                                    {opening.mustToHave.map((list, i) => {
                                       return (<li key={i} >{list.MTH}</li>)

                                    })}
                                 </ol>
                              </div>
                           </div>


                           <div className="d-flex w-100 align-items-center justify-content-center mt-4">
                              <ApplicationPopUp opening={opening} />

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }
         )
   )

}

export default Application