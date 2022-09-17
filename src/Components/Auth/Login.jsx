import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider'
import { useTheme } from "./../../Context/ThemeProvider";
import { createAvatar } from '@dicebear/avatars';

const Login = () => {
   const navigate = useNavigate()




   const { Login, credentials, setCredentials, setAdmin } = useAuth()
   const { style, avatarType, name, avatar } = useTheme();
   const { Primary, Secondary, Htext, Ntext, invert } = style;


   const handleLogin = async (e) => {
      e.preventDefault();
      const res = await Login(credentials);
      console.log(res);
      if (!res) return console.log("got error at handle login login.jsx")
      navigate("/admin")
   }

   const handleonChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })




   return (
      <div className={`  login page-center text-${Ntext}`} >
         <div className={` w-50  w-lg-100 container-lg    border my-4 p-4 rounded   `} >

            <div className="w-100  w-lg-100  d-flex align-items-center justify-content-center " >

               <div className=" mb-4 border d-flex align-items-center justify-content-center" style={{
                  borderRadius: "50%",
                  width: "80px",
               }}>
                  {<img src={`https://avatars.dicebear.com/api/${avatarType}/${name}.svg`} className="w-100" style={{
                     borderRadius: "50%",
                     width: "100px",
                  }} alt="" srcSet="" />}
               </div>
            </div>

            <form onSubmit={handleLogin} className={`container-fluid `}>
               <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleonChange} />
               </div>
               <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleonChange} />
               </div>

               <button type="submit" className="btn btn-primary m-2">Submit</button>
            </form>

         </div>
      </div>
   )
}

export default Login