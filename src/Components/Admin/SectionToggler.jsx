import React from 'react'
import { useBanner } from '../../Context/BannerProvider';
import { useTheme } from '../../Context/ThemeProvider';

const SectionToggler = () => {
   const { container, setContainer } = useBanner();
   const { style } = useTheme();
   const { Secondary, Htext, Ntext } = style;


   return (
      <div className=" navbar-expand-lg">
         <div className={` text-${Ntext} f-2 d-lg-flex d-none  border-bottom d-flex align-items-center justify-content-center fw-500  `} style={{ height: '43.55px' }}><span>Section</span></div>

         <div className="p-2">
            <button className={` navbar-toggler bg-${Secondary} px-2 py-1 rounded border m-1  `} type="button" data-bs-toggle="collapse" data-bs-target="#AdminSectionSupportedContent" aria-controls="SectionSupportedContent" aria-expanded="false" aria-label="Toggle Section">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
               </svg>
            </button>


            <div className="collapse navbar-collapse collapse-horizontal" id="AdminSectionSupportedContent">
               <section className=" d-flex ">

                  <div className="flex-column d-flex  navbar-nav">

                     <button type="button" className={` p-3 my-1 border-0 btn rounded-0   bg-${container === 'Banner' ? Htext : Secondary} `} onClick={() => setContainer("Banner")}>
                        <div className="manageBanner">
                           Banner
                        </div>
                     </button>

                     <button type="button" className={` p-3 my-1 border-0 btn  rounded-0  bg-${container === 'Openings' ? Htext : Secondary} `} onClick={() => setContainer("Openings")}>
                        <div className="manageOpenings">
                           Manage Openings
                        </div>
                     </button>

                     <button type="button" className={` p-3 my-1 border-0 btn  rounded-0  bg-${container === 'Application' ? Htext : Secondary} `} onClick={() => setContainer("Application")}>
                        <div className="viewApplication">
                           view Application
                        </div>
                     </button>

                  </div>
               </section>
            </div>
         </div>
      </div>
   )
}

export default SectionToggler