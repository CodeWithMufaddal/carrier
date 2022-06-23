import React, { useContext } from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import JobOpenings from './JobOpenings'
import Slider from './Slider'

const Main = () => {

   const { style } = useStateProvider();
   const { Primary, Secondary, Htext, Ntext, invert } = style;



   const { } = useStateProvider()
   return (
      <div className={`w-100 bg-${Primary} text-${Ntext}`}>
         <div className={` bg-${Secondary} page-center `}>
            <div className="my-1">
               <Slider />
            </div>
            <div className="py-2 my-3">
               <h1 className={`mx-5  text-decoration-underline  text-${Ntext}`}> <span>Job Openings</span></h1>
               <JobOpenings />
               <JobOpenings />
            </div>
         </div>
      </div>
   )
}

export default Main