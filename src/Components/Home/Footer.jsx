import React from 'react'
import './Footer.css'
import { useStateProvider } from '../../Context/StateProvider';


const Footer = () => {

  const { style } = useStateProvider();
  const { Primary, Secondary, Htext, Ntext, invert } = style;

  return (
    <div className={`w-100 bg-${Primary} text-${Ntext}  footer border-top`}>
      <div className={`bg-${Secondary} h-50 page-center`}>
        <div className=" ">
          This Is Footer
        </div>
      </div>
    </div>
  )
}

export default Footer