import React, { useState } from 'react'
import { useStateProvider } from '../../Context/StateProvider';
import { Link, useLocation } from 'react-router-dom'
import Banner from './Banner';
import Openings from './Openings';
import AppliedApllications from './AppliedApllications';
import SectionToggler from './SectionToggler';



const Main = () => {
   const location = useLocation();
   const { style, container, setContainer } = useStateProvider();
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