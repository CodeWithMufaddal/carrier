import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './JobOpenings.css'
import { useTheme } from '../../Context/ThemeProvider';
import { useOpening } from '../../Context/OpeningProvider';

const JobOpenings = () => {
   const navigate = useNavigate()
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   const { opening } = useOpening();

   return (

      <div className={`w-100 bg-${Primary} text-${Ntext}`}>
         <div className={` bg-${Secondary} page-center  `}>
            {opening.map((opening, i) => {
               return (
                  <div key={i} className={`job__opnings bg-${Primary} border border-${Htext}  rounded  p-1 p-lg-3  mx-2 mx-lg-5 my-2 my-lg-4`}>
                     <Link to={`/Application/${opening._id}`} className={`link-${Ntext} text-decoration-none`} >
                        <div className={` bg-${Primary}    position-relative rounded`} >
                           <div className=" w-100 rounded  d-flex flex-lg-nowrap flex-wrap-reverse "  >
                              <div className=" d-flex flex-column w-100 h-100 align-item-strach ">
                                 <div className={` text-${Htext}  f-1 fw-500 px-2 d-flex justify-content-between align-items-end my-1 `}>
                                    <div className="BannerTitle">
                                       <span>{opening.title}</span>
                                    </div>
                                 </div>

                                 <section className="h-100 d-flex px-1  flex-column  justify-content-center">

                                    <div className=" d-flex flex-column ">
                                       <div className="d-flex p-1  align-items-center">
                                          <label htmlFor="salary" className="fw-bold f-3  px-1 whitespace-nowrap ">
                                             Salary :
                                          </label>
                                          <div className=""><span>{opening.salary}</span></div>
                                       </div>

                                       <div className="d-flex p-1 align-items-center">
                                          <label htmlFor="experience" className="fw-bold f-3  px-1 whitespace-nowrap">
                                             Experience :
                                          </label>
                                          <div className=""><span>{opening.experience}</span></div>
                                       </div>

                                    </div>

                                    <div className="d-flex p-1 align-items-start  ">
                                       <label htmlFor="summury" className="fw-bold f-3 px-1 whitespace-nowrap " >
                                          Summury :
                                       </label>
                                       <div className="" name="summury" ><span>{opening.description.split(' ').slice(0, 20).join(' ')}...</span></div>
                                    </div>
                                 </section>
                              </div>
                           </div>
                        </div>

                     </Link>
                  </div >
               )
            })}
         </div >
      </div >
   )
}

export default JobOpenings