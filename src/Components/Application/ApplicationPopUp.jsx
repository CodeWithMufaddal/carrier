import React from 'react'
import { useStateProvider } from '../../Context/StateProvider';

const ApplicationPopUp = () => {


   const { style } = useStateProvider();
   const { Primary, Secondary, Htext, Ntext, invert } = style;

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('submit')
   }

   return (
      <>
         {/* <!-- Button trigger modal --> */}
         <button type="button" className={`btn btn-${Htext} mb-3 py-2 px-5`} data-bs-toggle="modal" data-bs-target="#exampleModal"
         // data-bs-whatever="@mdo"
         >
            Apply
         </button>

         {/* <!-- Modal --> */}
         <div className="modal fade    " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  " >
               <div className={`modal-content bg-${Primary}`}>
                  <div className={`modal-header text-${Htext}`}>
                     <h5 className="modal-title" id="exampleModalLabel">Application for <span>Software Engineer </span></h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={handleSubmit} method="post" id="exampleModal">
                     <div className={`modal-body text-${Ntext}`}>

                        <div className="field">
                           <div className="lableDiv">
                              <label htmlFor="name" className="label">Name</label>
                           </div>
                           <input type="text" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="name" required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="PhoneNumber" className="   label">Phone</label>
                           </div>
                           <input type="tel" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} pattern="[0-9]{10}" name="PhoneNumber" required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="email" className="label">Email</label>
                           </div>
                           <input type="email" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="email" required />
                        </div>

                        <div className="field ">
                           <div className="lableDiv">
                              <label htmlFor="cv" className="label">Resume / CV</label>
                           </div>
                           <input type="file" accept=".pdf , .docx" className={`w-100 bg-${Secondary} border border-${Ntext} p-1`} name="cv" required />
                           <span id="passwordHelpInline" className="form-text text-danger">
                              *Only .pdf and .docx files are allowed
                           </span>
                        </div>

                        <div className="field w-100  position-relative d-flex flex-column">
                           <div className="lableDiv">
                              <label htmlFor="coverLetter" className="label">Cover Letter</label>
                           </div>
                           <textarea name="coverLetter" className={`resize-none w-100 bg-${Secondary} border border-${Ntext} `} max="300" />
                           <span className="text-secondary  position-absolute bottom-0 end-0 ">300 </span>
                        </div>
                     

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className={`btn btn-${Htext}`}>Send</button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </ >
   )
}

export default ApplicationPopUp