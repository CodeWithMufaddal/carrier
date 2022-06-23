import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider'


const Login = () => {
   const navigate = useNavigate()

   const { Login, credentials, setCredentials, setAdmin } = useAuth()



   const handleLogin = async (e) => {
      e.preventDefault();
      const res = await Login(credentials);
      console.log(res);
      if (!res) return console.log("got error at handle login login.jsx")
      navigate("/admin")
   }

   const handleonChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })




   return (
      <div className="login container h-100 page-center">

         <form onSubmit={handleLogin} className="container-fluid">
            <div className="mb-3 ">
               <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleonChange} />
               <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
               <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleonChange} />
            </div>

            <button type="submit" className="btn btn-primary m-2">Submit</button>
         </form>

      </div>
   )
}

export default Login