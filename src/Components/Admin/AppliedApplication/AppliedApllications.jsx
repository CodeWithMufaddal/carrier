import React from 'react'
import { useAppliedApplication } from '../../../Context/AppliedApplicationProvider';
import { useTheme } from '../../../Context/ThemeProvider';


const AppliedApllications = () => {

  const { style } = useTheme();
  const { Primary, Secondary, Htext, Ntext, invert } = style;

  const img = [1, 2, 3]



  // const DownloadButton = props => {
  //   const downloadFile = () => {
  //     window.location.href = "https://yoursite.com/src/assets/files/exampleDoc.pdf"
  //   }
  //   return (
  //     <button onClick={downloadFile} />
  //   )
  // }


  const downloadFile = () => {
    window.location.href = "https://yoursite.com/src/assets/files/exampleDoc.pdf"
  }



  return (
    <div className={` w-100  d-flex flex-column  text-${Ntext}`}>
      <div className={`section bg-${Primary}  d-flex align-items-center justify-content-between px-3 border-bottom`}>
        <div className="f-1 fw-500"><span>Banner</span></div>
        <div className="m-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </div>
      </div>


      <div className="tabs">
        <div className={`mb-4  `}>
          {img.map((img, i) => {

            return (
              <div key={i} className={` bg-${Primary} border m-3 position-relative rounded`} >
                <div className=" w-100 rounded  d-flex flex-lg-nowrap flex-wrap "  >
                  <div className=" d-flex flex-column m-2 h-100 align-item-strach ">
                    <div className={` text-${Htext}  f-2 fw-500 px-2 d-flex justify-content-between align-items-end my-1 whitespace-nowrap `}>
                      <div className="BannerTitle">
                        <span>React.js With Software Development</span>
                      </div>
                    </div>

                    <div className="whitespace-nowrap f-3">

                      <div className="name d-flex align-items-center m-1 mt-0">
                        <lable className="lable">
                          <span className={`"text-${Ntext}"`}>Name :</span>
                        </lable>
                        <div className="personName ps-2"><span>DaudiBohra mufaddal Lorem, ipsum dolor.</span></div>
                      </div>

                      <div className="name d-flex align-items-center m-1">
                        <lable className="lable">
                          <span className={`"text-${Ntext}"`}>Mobile :</span>
                        </lable>
                        <div className="personName ps-2"><span>6352862921</span></div>
                      </div>

                      <div className="name d-flex align-items-center m-1">
                        <lable className="lable">
                          <span className={`"text-${Ntext}"`}>CV / Resume :</span>
                        </lable>
                        <a href="https://images.unsplash.com/photo-1655492411306-30ec0257c11b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" download="apple">
                          <button onClick={downloadFile} >cv.pdf</button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 ApplyedApplication__CoverLatter">
                    <lable>
                      cover Latter:
                    </lable>
                    <span className="rounded  d-flex w-100 border align-items-center text-center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, consequatur corporis et tempore id delectus molestias explicabo eius fuga aperiam totam, beatae veritatis perferendis quis atque saepe fugit non similique?
                    </span>
                  </div>


                </div>
                <div className={` d-flex w-100 justify-content-end  px-3 text-${Ntext}`}>
                  <span>
                    2d ago
                  </span>
                </div>
              </div>
            )
          })}

        </div>
      </div>



    </div >
  )
}

export default AppliedApllications