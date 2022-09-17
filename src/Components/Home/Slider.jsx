import React, { useEffect, useRef, useState } from 'react'
import './Slider.css'
import { useBanner } from '../../Context/BannerProvider';
import { useTheme } from '../../Context/ThemeProvider'




const Slider = () => {
   const { banner } = useBanner();
   const { style } = useTheme()
   const { Primary, Secondary, Htext, Ntext, invert } = style;
   const [hover, setHover] = useState()

   const slider = useRef(null)
   const [index, setIndex] = useState(0)

   useEffect(() => {
      const interval = setInterval(() => {
         if (index === banner.length - 1 || banner.length === 0) {
            setIndex(0)
         } else {
            if (!hover) {
               setIndex(index + 1)
            } 
         }
      }, 3000)

      return () => {
         clearInterval(interval)
      }
   }, [index])

   const RightClick = () => {
      if (index === banner.length - 1) {
         setIndex(0)
      } else {
         setIndex(index + 1)
      }
   }

   const LeftClick = () => {
      if (index === 0) {
         setIndex(banner.length - 1)
      } else {
         setIndex(index - 1)
      }

   }













   return (
      <>
         {<div className={`w-100  text-white`}>
            <div className={`  page-center  `}>

               <div className={`slider bannerSize `}>
                  <div className="slideShow h-100" style={{ transform: `translate3d(-${index * 100}%, 0 , 0)` }}>
                     {banner.map((banner, i) => {
                        return (
                           <div key={i} className="slides flex-row-reverse bannerSize position-relative" >
                              <div className="background  position-absolute"
                                 style={{ background: `url(${banner.image}) center / cover` }}
                              >
                                 <div className="bannerText text-center">
                                    <div className="bannerTitle fs-1 fw-500 ">
                                       {banner.title}
                                    </div>
                                    <div className="bannerDiscription p-2 f-1">
                                       {banner.discription}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </div>
                  <div className="dots">
                     {banner.map((_, i) => {
                        return (
                           <div key={i} className={`dot ${index === i ? 'dotactive' : ''}`} onClick={() => setIndex(i)}> </div>
                        )
                     })}

                  </div>

                  <button className={`Arrow RightArrow ${index === banner.length - 1 ? 'deactivebtn' : ''} text-white `} onClick={RightClick} ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                  </svg></button>

                  <button className={`Arrow LeftArrow ${index === 0 ? 'deactivebtn' : ''} text-white`} onClick={LeftClick}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                  </svg></button>

               </div>


            </div>
         </div >}
      </>

   )
}

export default Slider