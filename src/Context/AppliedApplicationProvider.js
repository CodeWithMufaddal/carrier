import React, { useState, useEffect, useContext } from "react";
import { AppliedApplicationContext } from "./CreateStateContaxt";



const AppliedApplicationProvider = ({ children }) => {

   return (
      <AppliedApplicationContext.Provider value={{}}>
         {children}
      </AppliedApplicationContext.Provider>
   )
}

const useAppliedApplication = () => {
   return useContext(AppliedApplicationContext)
}

export { AppliedApplicationProvider, useAppliedApplication } 