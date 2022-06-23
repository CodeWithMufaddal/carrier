import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./CreateStateContaxt";



const ThemeProvider = ({ children }) => {

   let localStyle = localStorage.getItem('style')
   const [style, setStyle] = useState(localStyle === 'light' ?
      {
         // Default Style is White based 

         Htext: "primary",
         Ntext: "dark",
         Primary: "white",
         Secondary: "light",
         invert: 1,
         toggle: "light"
      }
      :
      {
         Htext: "success",
         Ntext: "white",
         Primary: "dark",
         Secondary: "secondary",
         invert: 0,
         toggle: "dark",
      }

   )


   const toggleTheme = () => {
      if (localStorage.getItem('style') === "light") {
         setStyle({
            ...style,
            Htext: "success",
            Ntext: "white",
            Primary: "dark",
            Secondary: "secondary",
            invert: 0,
            toggle: "dark",
         })
         localStorage.setItem("style", 'dark')
      } else {
         setStyle({
            ...style,
            Htext: "primary",
            Ntext: "dark",
            Primary: "white",
            Secondary: "light",
            invert: 1,
            toggle: "light"
         })
         localStorage.setItem("style", 'light')
      }
   }


   return (
      <ThemeContext.Provider value={{ style, setStyle }}>
         {children}
      </ThemeContext.Provider>
   )
}

const useTheme = () => {
   return useContext(ThemeContext)
}

export { ThemeProvider, useTheme } 