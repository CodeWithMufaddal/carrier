import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./CreateStateContaxt";



const ThemeProvider = ({ children }) => {

   const [progress, setProgress] = useState(0)

   let localStyle = localStorage.getItem('style')
   const [style, setStyle] = useState(localStyle === 'dark' ?
      {
         Htext: "success",
         Ntext: "white",
         Primary: "dark",
         Secondary: "secondary",
         invert: 0,
         toggle: "dark",
      }
      :
      {
         // Default Style is White based 

         Htext: "primary",
         Ntext: "dark",
         Primary: "white",
         Secondary: "light",
         invert: 1,
         toggle: "light"
      }

   )


   const toggleTheme = () => {
      if (localStorage.getItem('style') === "dark") {
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
      } else {
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
      }
   }


   return (
      <ThemeContext.Provider value={{ style, setStyle, toggleTheme , progress, setProgress}}>
         {children}
      </ThemeContext.Provider>
   )
}

const useTheme = () => {
   return useContext(ThemeContext)
}

export { ThemeProvider, useTheme } 