import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Banner from './Banner/Banner';
import Openings from './Openings/Openings';
import AppliedApllications from './AppliedApplication/AppliedApllications';
import SectionToggler from './SectionToggler';
import { useBanner } from '../../Context/BannerProvider';
import { useTheme } from '../../Context/ThemeProvider';



const Main = ({ children }) => {
   const location = useLocation();
   const { container, setContainer, setProgress } = useBanner();
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   console.log(container)

   return (

      <div className={`w-100 bg-${Primary} `}>
         <div className={` bg-${Primary} page-center`}>
            <div className="d-flex my-2  border  ">
               <div className="border-end">
                  <SectionToggler />
               </div>

               <main className="w-100 h-100 ">
                  <div className="options">
            
                     <Outlet />
                  </div>
               </main>
            </div>
         </div >
      </div >

   )
}

export default Main