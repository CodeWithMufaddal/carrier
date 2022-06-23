import React, { useEffect } from 'react'
import '../AdminSection.css'
import BannerPopUp from './BannerPopUp';
import { useTheme } from '../../../Context/ThemeProvider';
import { useBanner } from '../../../Context/BannerProvider';


const Banner = () => {
  const { banner, modal, modalRef, popUpBanner, setPopUpBanner, bid, setBid, ebanner, setEbanner, deleteBanner } = useBanner();
  const { style } = useTheme();
  const { Primary, Htext, Ntext, } = style;


  const img = [
    "https://img.freepik.com/free-vector/flat-sale-banner-with-photo_23-2149026968.jpg?w=1380&t=st=1655210897~exp=1655211497~hmac=75354c08c529e08815eb082aa3236bd2bca96b7eeaf9f13d927e46f9374d4932",
    "https://img.freepik.com/free-vector/big-diwali-sale-banner-with-crackers-decoration_1017-21252.jpg?t=st=1655212313~exp=1655212913~hmac=625902359b6947f82715a727b5c88c30172de36d9d76db29c73322de833843d5&w=1380", "https://img.freepik.com/free-vector/black-friday-sale-banner-torn-paper-style_1017-34718.jpg?t=st=1655211097~exp=1655211697~hmac=eebf1478aec1d488ba863d9fb2d6af0272d135962df8a38506ee6a32b108c0de&w=1380"
  ]

  const handelupdatebanner = async (banner) => {
    // console.log(e._id, "update")
    setPopUpBanner('update')
    console.log(ebanner, "thisiis banner e")

    setEbanner({
      etitle: banner.title,
      ediscription: banner.discription
    })

    console.log(ebanner, "thisiis banner a")
    console.log(banner._id)
    setBid(banner._id)
    // setBid(e._id)


    console.log(bid, "bid")
  }

  const Handeldeletebanner = async (e) => {
    console.log(e._id)

    let dBanner = await deleteBanner(e._id)
    if (!dBanner) return console.log(dBanner, "res at click")

    setBid(e._id)

  }







  return (

    <div className={` w-100  d-flex flex-column  text-${Ntext}`}>

      <div className={`section bg-${Primary}  d-flex align-items-center justify-content-between px-3 border-bottom`}>
        <div className="f-1 fw-500"><span>Banner</span></div>
        <div className="m-2">
          <BannerPopUp />
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
                          data-bs-toggle="modal" data-bs-target={` #${popUpBanner} `}
                          ref={modalRef}
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
                    <span className="rounded bannerbgImg d-flex w-100 h-100 " style={{ background: `url(${img}) center/cover no-repeat` }}>

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