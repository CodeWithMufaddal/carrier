import React, { useState, useEffect, useContext } from 'react'
import Contaxt from './CreateStateContaxt'


const StateProvider = ({ children }) => {

   const [first, setfirst] = useState("second")








   return (
      <Contaxt.Provider value={{ first }}>
         {children}
      </Contaxt.Provider>
   )
}

const useStateProvider = () => {
   const context = useContext(Contaxt)
   return context
}



export { useStateProvider, StateProvider }