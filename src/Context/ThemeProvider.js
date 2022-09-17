import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./CreateStateContaxt";



const ThemeProvider = ({ children }) => {

   const [progress, setProgress] = useState(0)
   const [avatarType, setAvatarType] = useState()
   const [name, setName] = useState()

   let localStyle = localStorage.getItem('style')


   let DarkStyle = {
      Htext: "success",
      Ntext: "white",
      Primary: "dark",
      Secondary: "secondary",
      invert: 0,
      toggle: "dark",
      muted: "muted",
   }

   let LightStyle = {
      Htext: "primary",
      Ntext: "dark",
      Primary: "white",
      Secondary: "light",
      invert: 1,
      toggle: "light",
      muted: "secondary",
   }




   const [style, setStyle] = useState(localStyle === 'dark' ? DarkStyle : LightStyle)

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

   useEffect(() => {
      console.log(localStorage.getItem("style"), "yes it call")
      document.body.classList.add(`${localStyle === 'dark' ? 'bg-dark' : 'bg-white'}`)
      return () => {
         document.body.classList.remove(`${localStyle === 'dark' ? 'bg-dark' : 'bg-white'}`)
      }
   }, [toggleTheme])


   let avatar = [
      'adventurer',
      'adventurer-neutral',
      'avataaars',
      'big-ears',
      'big-ears-neutral',
      'big-smile',
      'bottts',
      'croodles',
      'croodles-neutral',
      'female',
      'gridy',
      'human',
      'identicon',
      'initials',
      'jdenticon',
      'male',
      'micah',
      'miniavs',
      'open-peeps',
      'personas',
      'pixel-art',
      'pixel-art-neutral',
   ]



   useEffect(() => {
      return () => {
         setAvatarType(avatar[Math.floor(Math.random() * avatar.length)])
         setName(Math.floor(Math.random() * 100))
      }
   }, [])



   return (
      <ThemeContext.Provider value={{ style, setStyle, toggleTheme, progress, setProgress, avatarType, name, avatar }}>
         {children}
      </ThemeContext.Provider>
   )
}

const useTheme = () => {
   return useContext(ThemeContext)
}

export { ThemeProvider, useTheme } 