import React, { useState, useRef, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from '../../firebase';
import { useTheme } from '../../Context/ThemeProvider';
import { useBanner } from '../../Context/BannerProvider';
import styles from './styles.module.css';

const FileInput = ({ name, label, value, type, handleinputState, ...rest }) => {

   const { popUpBanner } = useBanner();
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;

   const inputRef = useRef();
   const [iprogress, setIprogress] = useState(0)
   const [iprogressShow, setIprogressShow] = useState(false)


   const handleUpload = async () => {
    
   }









   return (
      <div className={styles.container}>

         <input accept="image/*" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 ${styles.input}`} name={`${popUpBanner === 'add' ? 'image' : "eimage"}`}
            type='file'
            ref={inputRef}

            onChange={(e) => handleinputState(name, e.currentTarget.files[0])}
            value={value}
         />

         <button
            type="button"
            className={styles.button}
            onClick={() => inputRef.current.click()}
         >{label}</button>
         {type === 'image' && value && (
            <img
               src={typeof value === "string" ? value : URL.createObjectURL(value)}
               alt="file"
               className={styles.preview_img}
            />
         )}
         {/* {type === 'pdf' && value && (
            <img 
               src={typeof value === "string" ? value : URL.createObjectURL(value)}
               alt="file"
            />
         )} */}
         {value !== null && !iprogressShow && typeof value !== "string" && (
            <button onClick={handleUpload} className={styles.button}>
               upload at online
            </button>
         )}

         {iprogressShow && iprogress < 100 && (
            <div className={styles.progress_container}>
               <p>{iprogress}%</p>
            </div>
         )}
         {iprogress === 100 && (
            <div className={styles.progress_container}>
               <p>ho gai upload</p>
            </div>
         )}

      </div>
   )
}

export default FileInput