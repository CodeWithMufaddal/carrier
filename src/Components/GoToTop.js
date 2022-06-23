import React from 'react'
import './GoToTop.css'
import { useStateProvider } from '../Context/StateProvider';

const GoToTop = () => {
   const { style } = useStateProvider();
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   const GoToTop = () => {
      window.scrollTo(0, 0)
   }
   return (


      <button onClick={GoToTop} className={` goTopbtn  bg-${Htext} btn  `}  >
         <div className={` goTopInnerDiv `}>
            <span >
               <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"  viewBox="0 0 32 32"><g data-name="90-Arrow Up"><path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" /><path d="m15.29 10.29-8 8L8.7 19.7l7.3-7.29 7.29 7.29 1.41-1.41-8-8a1 1 0 0 0-1.41 0z" /></g></svg>
            </span>
         </div>
      </button>
   )
}

export default GoToTop