import React, { useContext } from 'react'
import { useBanner } from '../../Context/BannerProvider'
import { useOpening } from '../../Context/OpeningProvider'
import { useTheme } from '../../Context/ThemeProvider'
import JobOpenings from './JobOpenings'
import Slider from './Slider'
import './Main.css'
const Main = () => {

   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   const { opening } = useOpening();
   const { banner } = useBanner();



   return (
      <div className={`w-100 bg-${Primary} text-${Ntext} `}>
         <div className={`  page-center `} style={{ marginTop: '5rem' }}>

            {<div className="my-1  "  >
               {!banner.length > 0 ?
                  <div className={` nonBanner   bg-${Secondary} rounded  shadow-sm`} >
                     <div className={` loadAnimation h-100`} >
                        <div className="position-absolute">f</div>
                     </div>
                  </div>
                  : <Slider />
               }
            </div>}

            <h1 className={`m-4 bg-${Primary} text-decoration-underline  text-${Ntext}`}> <span>Job Openings</span></h1>
            {<div className={`py-2 my-3 bg-${Secondary}`}>
               {!opening.length > 0 &&
                  <div className="">
                     <div className={`border nonOpening loadAnimation border-${Primary} my-2 mx-5  rounded shadow-sm bg-${Primary}`}  ></div>
                     <div className={`border nonOpening loadAnimation border-${Primary} my-2 mx-5  rounded shadow-sm bg-${Primary}`}  ></div>
                  </div>
               }
               <JobOpenings />
            </div>}
         </div>
      </div>
   )
}

export default Main