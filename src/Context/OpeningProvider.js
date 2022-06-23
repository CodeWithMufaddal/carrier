import React, { useState, useEffect, useContext } from "react";
import { OpenningContext } from "./CreateStateContaxt";



const OpenningProvider = ({ children }) => {

   return (
      <OpenningContext.Provider value={{}}>
         {children}
      </OpenningContext.Provider>
   )
}

const useOpenning = () => {
   return useContext(OpenningContext)
}

export { OpenningProvider, useOpenning } 