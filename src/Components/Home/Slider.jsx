import React, { useEffect, useRef, useState } from 'react'
import './Slider.css'
import { useBanner } from '../../Context/BannerProvider';
import { useTheme } from '../../Context/ThemeProvider'




const Slider = () => {
   const { banner } = useBanner();
   const { style } = useTheme()
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   const slider = useRef(null)
   const [index, setIndex] = useState(0)





   const img = [
      "https://img.freepik.com/free-vector/flat-sale-banner-with-photo_23-2149026968.jpg?w=1380&t=st=1655210897~exp=1655211497~hmac=75354c08c529e08815eb082aa3236bd2bca96b7eeaf9f13d927e46f9374d4932",
      "https://img.freepik.com/free-vector/big-diwali-sale-banner-with-crackers-decoration_1017-21252.jpg?t=st=1655212313~exp=1655212913~hmac=625902359b6947f82715a727b5c88c30172de36d9d76db29c73322de833843d5&w=1380", "https://img.freepik.com/free-vector/black-friday-sale-banner-torn-paper-style_1017-34718.jpg?t=st=1655211097~exp=1655211697~hmac=eebf1478aec1d488ba863d9fb2d6af0272d135962df8a38506ee6a32b108c0de&w=1380"
   ]



   useEffect(() => {
      const interval = setInterval(() => {
         if (index === banner.length - 1) {
            setIndex(0)
         } else {
            setIndex(index + 1)
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
      <div className={`w-100 bg-${Primary} text-${Ntext}`}>
         <div className={` bg-${Secondary} page-center `}>

            <div className={`slider `}>
               <div className="slideShow" style={{ transform: `translate3d(-${index * 100}%, 0 , 0)` }}>
                  {banner.map((banner, i) => {
                     return (<div key={i} className="slides flex-row-reverse">
                        <div className="slides"
                           style={{ background: `url(${img}) center / cover` }}
                        >
                        </div>
                        <div className="">
                           <div className="bannerTitle f-1 fw-500 ">
                              {banner.title}
                           </div>
                           <div className="bannerDiscription p-2 f-3">
                              {banner.discription}
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

               <button className={`Arrow RightArrow ${index === banner.length - 1 ? 'deactivebtn' : ''}`} onClick={RightClick} ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
               </svg></button>

               <button className={`Arrow LeftArrow ${index === 0 ? 'deactivebtn' : ''}`} onClick={LeftClick}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
               </svg></button>

            </div>


         </div>
      </div >
   )
}

export default Slider