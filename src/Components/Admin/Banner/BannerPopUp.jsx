import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBanner } from '../../../Context/BannerProvider';
import { useTheme } from '../../../Context/ThemeProvider';


const BannerPopUp = () => {
   const navigation = useNavigate()
   const reftoggle = useRef(null)
   const refClose = useRef(null)

   const { createBanner, updateBanner, popUpBanner, setPopUpBanner, ebanner, setEbanner, bid, cbanner, setCbanner } = useBanner();
   const { style } = useTheme();
   const { Primary, Secondary, Htext, Ntext, } = style;

   const handleonChange = (e) => {
      console.log(popUpBanner, "thisi is popUpBanner")
      if (popUpBanner === "add") {
         setCbanner({ ...cbanner, [e.target.name]: e.target.value })
         console.log("we are in if condition")

      }
      else {
         setEbanner({ ...ebanner, [e.target.name]: e.target.value })
         console.log(ebanner, "this is ebanner")
         console.log("we are in else")
         console.log(cbanner)
      }
   }







   const handleSubmit = async (e) => {
      e.preventDefault()

      if (e.target.id === 'add ') {

         const create = await createBanner(cbanner)
         if (!create) return console.log("at handle submit in popUpBanner")
         setCbanner({
            title: '',
            discription: '',
            image: '',
         })

         refClose.current.click()

      } else if (e.target.id === 'update ') {
         console.log('this is update')

         const update = await updateBanner(ebanner)
         console.log('this is res for update', update)
         if (!update) return console.log("at update problem")

         refClose.current.click()

         setEbanner({
            etitle: '',
            ediscription: '',
            eimage: '',
         })
      } else {
         console.log("something wrong in if else")
      }
   }





   return (
      <>
         {/* <!-- Button trigger modal --> */}
         <button type="button" className={`btn btn-sm text-${Ntext} `} data-bs-toggle="modal" data-bs-target={`#${popUpBanner}`}
            // data-bs-whatever="@mdo"
            onClick={() => { setPopUpBanner('add') }}
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
               <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
         </button>

         {/* <!-- Modal --> */}
         <div className="modal fade " id={`${popUpBanner}`} tabIndex="-1" aria-labelledby={`${popUpBanner}Label`} ref={reftoggle} aria-hidden="true"  >
            <div className="modal-dialog  " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="exampleModalLabel"><span>{popUpBanner === 'update' ? 'Update Banner' : 'Add New Banner'}</span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>



                  <form onSubmit={handleSubmit} method="post" id={`${popUpBanner} `}>
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="title" className="label">Title</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name={`${popUpBanner === 'add' ? 'title' : "etitle"}`}
                              value={`${popUpBanner === 'add' ? cbanner.title : ebanner?.etitle}`}
                              onChange={handleonChange} required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="discription" className="label">discription</label>
                           </div>
                           <textarea type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1 resize-none `} name={`${popUpBanner === 'add' ? 'discription' : "ediscription"}`} onChange={handleonChange}
                              value={`${popUpBanner === 'add' ? cbanner.discription : ebanner?.ediscription}`} >

                           </textarea>
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="image" className="label">Background image</label>
                           </div>
                           <input type="file" accept="image/*" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name={`${popUpBanner === 'add' ? 'image' : "eimage"}`} onChange={handleonChange}

                           />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Only image  are allowed
                           </span>
                        </div>

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" id='submit-banner' className={`btn btn-${Htext}  `}  ><span>{popUpBanner === 'update' ? 'Update' : 'Post'}</span></button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default BannerPopUp