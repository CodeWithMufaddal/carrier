import React, { useContext } from 'react'
import { useStateProvider } from '../../Context/StateProvider'
import './Main.css'

const Main = () => {




   const { first } = useStateProvider()
   console.log(first)
   return (
      <div className="w-100 text-underline">
         <div className=" bg-white page-center">
            <h1 className="m-5 jobOpeningTitle"> <span>Job Openings</span></h1>

         </div>
      </div>
   )
}

export default Main