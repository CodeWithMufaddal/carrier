import React, { useState } from 'react'
import { useAppliedApplication } from '../../../Context/AppliedApplicationProvider';
import { useTheme } from '../../../Context/ThemeProvider';
import CsvDownload from 'react-json-to-csv'

const AppliedApllications = () => {
  const [time, setTime] = useState(0)
  const { applications, setApplications, handleSortBy, sortby, setSortby, fetchallapplication } = useAppliedApplication();
  const { style } = useTheme();
  const { Primary, Secondary, Htext, Ntext, invert } = style;




  return (
    <div className={` w-100  d-flex flex-column  text-${Ntext}`}>
      <div className={`section bg-${Primary}  d-flex align-items-center justify-content-between py-1 px-3 border-bottom`}>
        <div className="f-1-5 fw-500"><span>View Application</span></div>
      </div>
      <div className={` section bg-${Primary}  d-flex align-items-center justify-content-between py-1 px-3  border-bottom`}>
        <div className="f-3 fw-500 mx-2"><span>filter :</span></div>
        <div className="f-3 fw-500 mx-2">
          <div className="dropdown">

            <button className="btn  " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Sort by: {sortby} 	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><button type="button" className="dropdown-item" onClick={fetchallapplication}>Most relevant</button></li>
              <li><button type="button" className="btn dropdown-item" onClick={handleSortBy}>Most recent</button></li>
            </ul>
          </div>
        </div>
      </div>


      <div className="tabs">
        <div className={`mb-4  `}>
          {applications.length !== 0 ?
            applications.map((applications, i) => {

              let publishDate = new Date(applications.date)
              let today = new Date()
              function monthDiff(d1, d2) {
                let months;
                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth();
                months += d2.getMonth();
                return months >= 0 && months < 12 ? `${months}month` : false;
              }

              let diff = today.getTime() - publishDate.getTime();
              let secondsago = Math.floor(diff / (1000))
              let minutesago = Math.floor(diff / (1000 * 60))
              let houresago = Math.floor(diff / (1000 * 60 * 60))
              let daysago = Math.floor(diff / (1000 * 60 * 60 * 24))
              let weeksago = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
              let yearsago = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
              let monthsago = monthDiff(publishDate, today)

              const checkfunc = () => {
                let trytest = 0;
                if (secondsago < 60) { return trytest = `${secondsago}s` }
                else if (minutesago < 60) { return trytest = `${minutesago}min` }
                else if (houresago < 24) { return trytest = `${houresago}h` }
                else if (daysago < 24) { return trytest = `${daysago}d` }
                else if (weeksago < 4) { return trytest = `${weeksago}w` }
                else if (monthsago) { return trytest = monthsago }
                else if (yearsago < 60) { return trytest = `${yearsago}yr` }
              }

              let longago = checkfunc()

              return (
                <div key={i} className={` bg-${Primary} border m-3 position-relative rounded`} >
                  <div className=" w-100 rounded  d-flex flex-lg-nowrap flex-wrap "  >
                    <div className=" d-flex flex-column m-2 h-100 align-item-strach ">
                      <div className={` text-${Htext}  f-2 fw-500 px-2 d-flex justify-content-between align-items-end my-1 whitespace-nowrap `}>
                        <div className="BannerTitle">
                          <span>{applications.title}</span>
                        </div>
                      </div>

                      <div className="whitespace-nowrap f-3">

                        <div className="name d-flex align-items-center m-1 mt-0">
                          <label className="label">
                            <span className={`"text-${Ntext}"`}>Name :</span>
                          </label>
                          <div className="personName ps-2"><span>{applications.name}</span></div>
                        </div>

                        <div className="name d-flex align-items-center m-1 mt-0">
                          <label className="label">
                            <span className={`"text-${Ntext}"`}>Email :</span>
                          </label>
                          <div className="personName ps-2"><span>{applications.email}</span></div>
                        </div>

                        <div className="name d-flex align-items-center m-1">
                          <label className="label">
                            <span className={`"text-${Ntext}"`}>Mobile :</span>
                          </label>
                          <div className="personName ps-2"><span>{applications.phone}</span></div>
                        </div>

                        <div className="name d-flex align-items-center m-1">
                          <label className="label">
                            <span className={`"text-${Ntext}"`}>CV / Resume :</span>
                          </label>

                          <a href={applications.cv} target="_blank" className="">
                            <button type="button" className={` btn btn-outline-primary py-0 mx-1 `} > cv.pdf</button>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 ApplyedApplication__CoverLatter d-flex align-items-start h-100 m-2  ">
                      <label>
                        cover Latter:
                      </label>
                      <span className="rounded  d-flex w-100 border align-items-center   text-center ps-2">

                        {applications.cLeter}
                      </span>
                    </div>


                  </div>
                  <div className={` d-flex w-100 justify-content-end  px-3 text-secondary`}>
                    <span>
                      {longago}
                    </span>
                  </div>
                </div>
              )
            })
            : (
              <div className='container  position-absolute top-50   d-flex align-items-center' style={{left: "40%"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-exclamation-circle me-3" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
                <span className="fw-500 f-1">
                  No One Has Applied Yet
                </span>
              </div>
            )
          }

          {applications.length !== 0 && <div className={`position-sticky p-1 fw-500 bottom-0 bg-${Primary} w-100`}>
            <div className={`btn btn-${Htext} fw-500 mx-2`}>
              <CsvDownload
                style={{
                  background: 'none',
                  font: 'inherit',
                  color: 'inherit',
                }}
                data={applications}
                filename="AllApplications.csv"
              >
                Download
              </CsvDownload>
            </div>
          </div>}


        </div>
      </div>



    </div >
  )
}

export default AppliedApllications