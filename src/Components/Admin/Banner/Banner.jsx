import React, { useEffect } from 'react'
import '../AdminSection.css'
import BannerPopUp from './BannerPopUp';
import { useTheme } from '../../../Context/ThemeProvider';
import { useBanner } from '../../../Context/BannerProvider';
import UpdateBanner from './UpdateBanner';
import storage from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


const Banner = () => {
  const { banner, popUpBanner, setPopUpBanner, setBid, setEbanner, deleteBanner, ebanner } = useBanner();
  const { style , setProgress} = useTheme();
  const { Primary, Htext, Ntext, } = style;

  const handelupdatebanner = async (banner) => {
    setEbanner({
      etitle: banner.title,
      ediscription: banner.discription,
      eimage: banner.image
    })
    setBid(banner._id)
  }

  const Handeldeletebanner = async (e) => {
    setProgress(20)
    let ask = window.confirm("are you sure you want to delete this banner?")
    if (!ask) {
      setProgress(100)
      return ask
    }
    // Delete the file
    setProgress(30)
    const desertRef = ref(storage, `${e.image}`);
    
    setProgress(40)
    deleteObject(desertRef).then((res) => {
      console.log(res, "File deleted successfully")
    }).catch((error) => {
      console.log(error)
      setProgress(100)
    });
    
    setProgress(50)
    let dBanner = await deleteBanner(e._id)
    if (!dBanner) return console.log(dBanner, "res at click")
    setProgress(100)
    setBid(e._id)
  }


  return (

    <div className={` w-100  d-flex flex-column  text-${Ntext}`}>

      <div className={`section bg-${Primary}  d-flex align-items-center justify-content-between px-3 border-bottom`} style={{ height: '43.55px' }}>
        <div className="f-1 fw-500"><span>Banner</span></div>
        <div className="m-2">
          <BannerPopUp />
          <UpdateBanner />
        </div>
      </div>


      <div className="tabs">
        <div className={`mb-4  `}>
          {banner.map((banner, i) => {

            return (
              <div key={i} className={` bg-${Primary} border m-3 position-relative rounded`} >
                <div className=" w-100 rounded  d-flex flex-lg-nowrap flex-wrap-reverse "  >
                  <div className=" d-flex flex-column w-100 h-100 align-item-strach ">
                    <div className={` text-${Htext}  f-1-4 fw-500 px-2 d-flex justify-content-between align-items-start my-1 `}>
                      <div className="BannerTitle">
                        <span>{banner.title}</span>
                      </div>

                      <div className="iconToggle m-1 ">
                        <button type="button" className={`trashIcon text-${Ntext}   mx-2 f-5`}
                          data-bs-toggle="modal" data-bs-target={`#update`}
                          onClick={() => handelupdatebanner(banner)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" w-75 bi bi-pencil-square " viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button>

                        <button type="button" className={`trashIcon text-${Ntext}    mx-2 f-5`} onClick={() => Handeldeletebanner(banner)}  >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" w-75  bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <section className="h-100 d-flex p-1 mt-4">
                      {banner.discription}
                    </section>

                  </div>


                  <div className="w-100 innerCoverBanner">
                    <span className="rounded bannerbgImg d-flex w-100 h-100 " style={{ background: `url(${banner.image}) center/cover no-repeat` }}>

                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          {/* </InfiniteScroll> */}


        </div>
      </div>

    </div >
  )
}

export default Banner