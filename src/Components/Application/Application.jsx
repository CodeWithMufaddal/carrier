import React from 'react'
import './Application.css'
import ApplicationPopUp from './ApplicationPopUp'
import { useTheme } from '../../Context/ThemeProvider';




const Application = () => {

   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;


   window.onload = window.scrollTo(0, 0)

   return (
      <div className="w-100 my-lg-3 my-2 ">
         <div className="  page-center">
            <div className="Application ">
               <div className="mx-1  border rounded ">
                  <div className="border-bottom px-4 p-2">

                     <div className=" mb-3 mx-2">
                        <span className={`f-1 text-${Htext} whitespace-nowrap`} >Apply For  <span>Software Engineer</span></span>
                     </div>
                     <div className="fw-bold mb-3">
                        <div className="my-3 mx-2">

                           <div className={` text-${Ntext} f-3 whitespace-nowrap `}>
                              <div className="fw-500 d-flex  ">
                                 <label className="px-1">Salary : </label>
                                 <div className=" px-1">
                                    <span>5L</span>/PA
                                 </div>
                              </div>
                           </div>

                           <div className={` text-${Ntext}`}>
                              <div className="fw-500 d-flex  f-3 ">
                                 <label className="px-1 whitespace-nowrap">Expireance : </label>
                                 <div className=" px-1 ">
                                    <span>2+</span> years of experience
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-3">

                     <div className={`text-${Ntext}`}>
                        <div className=" mb-1  fw-bold">
                           <span>JOB DESCRIPTION</span>
                        </div>
                        <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                           <li >Under Position</li>
                           <li>Job Title: <span> Software Engineer </span> - PHP: Joomla/ Wordpress/ Magento <span>2</span>+ years  </li>
                           <li>Job Function: Information Technology </li>
                           <li>Employment Type: Full Time </li>
                           <li>We are looking for a skilled web developer having at least 1 to 3 yrs. of experience on web development and is well versed with technologies, PHP, JavaScript, HTML5, Bootstrap. </li>

                           <li>This opening is for our Pune office.</li>
                           <li>Experience: Mid-senior level</li>
                        </ol>
                     </div>
                     <div className={`text-${Ntext}`}>
                        <div className=" mb-1  fw-bold">
                           <span>JOB RESPONSIBILITIES</span>
                        </div>
                        <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                           <li >Under Position</li>
                           <li>Job Title: Web Developer - PHP: Joomla/ Wordpress/ Magento (1-3yrs)</li>
                           <li>Job Function: Information Technology </li>
                           <li>Employment Type: Full Time </li>
                           <li>We are looking for a skilled web developer having at least 1 to 3 yrs. of experience on web development and is well versed with technologies, PHP, JavaScript, HTML5, Bootstrap.</li>

                           <li>This opening is for our Pune office.</li>
                           <li>Experience: Mid-senior level</li>
                        </ol>
                     </div>

                     <div className={`text-${Ntext}`}>
                        <div className=" mb-1  fw-bold">
                           <span >MUST TO HAVE</span>
                        </div>
                        <ol className={`JobDescriptionPoints f-4 lh-lg `}  >
                           <li >Under Position</li>
                           <li>Job Title: Web Developer - PHP: Joomla/ Wordpress/ Magento (1-3yrs)</li>
                           <li>Job Function: Information Technology </li>
                           <li>Employment Type: Full Time </li>
                           <li>We are looking for a skilled web developer having at least 1 to 3 yrs. of experience on web development and is well versed with technologies, PHP, JavaScript, HTML5, Bootstrap.</li>

                           <li>This opening is for our Pune office.</li>
                           <li>Experience: Mid-senior level</li>
                        </ol>
                     </div>
                  </div>


                  <div className="d-flex w-100 align-items-center justify-content-center mt-4">
                     <ApplicationPopUp />

                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Application