import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Banner from './Banner/Banner';
import Openings from './Openings/Openings';
import AppliedApllications from './AppliedApplication/AppliedApllications';
import SectionToggler from './SectionToggler';
import { useBanner } from '../../Context/BannerProvider';
import { useTheme } from '../../Context/ThemeProvider';



const Main = () => {
   const location = useLocation();
   const { container, setContainer, setProgress } = useBanner();
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   return (

      <div className={`w-100 bg-${Primary} `}>
         <div className={` bg-${Primary} page-center`}>
            <div className="AdminMain my-2 d-flex border  ">
               <div className="border-end">
                  <SectionToggler />
               </div>

               <main className="w-100 h-100 ">
                  <div className="options">
                     {container === 'Banner' ? <Banner /> : container === 'Openings' ? <Openings /> : container === 'Application' ? <AppliedApllications /> : <h1>404 Page Not Found</h1>}
                  </div>
               </main>
            </div>
         </div >
      </div >

   )
}

export default Main