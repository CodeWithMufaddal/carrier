import React from 'react'
import { Link } from 'react-router-dom'
import './JobOpenings.css'
import { useStateProvider } from '../../Context/StateProvider';

const JobOpenings = () => {

   const { style } = useStateProvider();
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   return (

      <div className={`w-100 bg-${Primary} text-${Ntext}`}>
         <div className={` bg-${Secondary} page-center `}>
            <div className={`job__opnings bg-${Primary} border rounded   mx-5 my-4`}>
               <Link to="/Application" className={`link-${Ntext} text-decoration-none`}>

                  <div className={`job__title text-${Htext} whitespace-nowrap`}>
                     <div className="f-1">Software Engineer</div>
                  </div>

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




                  <div className={`text-${Ntext}`}>
                     <div className=" d-flex">
                        <div className={` text-dark`}>
                           <label className={`px-1 whitespace-nowrap f-4 fw-bold text-${Ntext}`}>Job Summary : </label>

                           <span className={`text-${Ntext} f-4`}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora vero voluptate assumenda ad autem? Beatae  perspiciatis repellat laborum provident, iste omnis blanditiis<span className={` text-${Htext}`}>...Read more</span>
                           </span>
                        </div>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default JobOpenings