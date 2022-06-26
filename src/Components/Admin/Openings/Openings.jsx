import React from 'react'
import OpeningPopUp from './OpeningPopUp'
import { useTheme } from '../../../Context/ThemeProvider';
import { useOpening } from '../../../Context/OpeningProvider';

const Openings = () => {



  const { style } = useTheme();
  const { popUpOpening, opening, setOpening, setPopUpOpening, handelupdateOpening ,deleteOpenings} = useOpening();
  const { Primary, Htext, Ntext } = style;

  return (
    <div className={` w-100  d-flex flex-column  text-${Ntext}`}>
      <div className={`section bg-${Primary}  d-flex align-items-center justify-content-between px-3 border-bottom`} style={{ height: '43.55px' }}>
        <div className="f-1 fw-500"><span>Openings</span></div>
        <div className="m-2">
          <OpeningPopUp />
        </div>
      </div>


      <div className="tabs">
        <div className={`mb-4  `}>
          {opening.map((opening, i) => {

            return (
              <div key={i} className={` bg-${Primary} border m-3 position-relative rounded`} >
                <div className=" w-100 rounded  d-flex flex-lg-nowrap flex-wrap-reverse "  >
                  <div className=" d-flex flex-column w-100 h-100 align-item-strach ">
                    <div className={` text-${Htext}  f-1 fw-500 px-2 d-flex justify-content-between align-items-end my-1 `}>
                      <div className="BannerTitle">
                        <span>React.js</span>
                      </div>

                      <div className="iconToggle m-1 bg-none  ">
                        <button type="button" className={`trashIcon text-${Ntext}   mx-2 f-5`}
                          data-bs-toggle="modal" data-bs-target={` #${popUpOpening} `}
                          onClick={() => handelupdateOpening(opening)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square " viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button>

                        <button type="button" className={`trashIcon text-${Ntext}   mx-2 f-5`} onClick={() => deleteOpenings(opening._id)} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" w-75  bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <section className="h-100 d-flex p-1 mt-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia cum, fugit labore rem quo nisi ad dolor quaerat nostrum at consequuntur, perspiciatis quidem a necessitatibus aspernatur aperiam asperiores! Porro, cum.
                    </section>

                  </div>



                </div>
              </div>
            )
          })}

        </div>
      </div>



    </div >
  )
}

export default Openings