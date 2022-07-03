import React, { useRef, useState } from 'react'
import './App.css';

// ===== Components ====
import Navbar from './Components/Home/Navbar';
import Main from './Components/Home/Main';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import AdminMain from './Components/Admin/Main';
import AdminProtectedRoute from './Components/Auth/AdminProtectedRoute';
import Login from './Components/Auth/Login';
import Footer from './Components/Home/Footer';
import GoToTop from './Components/GoToTop';
import Application from './Components/Application/Application';

// ======= external components =====
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { useTheme } from './Context/ThemeProvider'
import Banner from './Components/Admin/Banner/Banner';
import Openings from './Components/Admin/Openings/Openings';
import AppliedApllications from './Components/Admin/AppliedApplication/AppliedApllications';





const App = () => {

  const { style, progress, setProgress } = useTheme();

  const { applyFor } = useParams();
  const ref = React.useRef(null);


  return (
    <Router>
      <div className={`App bg-${style.Primary} `}>
        <GoToTop />
        <LoadingBar
          color="red"
          height={"3px"}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute>  <Main />  </ProtectedRoute>} />
          <Route path={`/Application/:jobid`} element={<ProtectedRoute>  <Application  />  </ProtectedRoute>} />

          {/* Special For Admin */}
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminMain />
            </AdminProtectedRoute>
          } >
            <Route path="banner" element={<Banner />} />
            <Route path="opening" element={<Openings />} />
            <Route path="appliedApplication" element={<AppliedApllications />} />
          </Route>
          <Route path="/admin/banner" element={
            <AdminProtectedRoute>
              <AdminMain>
                <Banner />
              </AdminMain>
            </AdminProtectedRoute>
          } />

          <Route path="/admin/openings" element={
            <AdminProtectedRoute>
              <AdminMain />
              <Openings />
            </AdminProtectedRoute>
          } />

          <Route path="/admin/appliedapplication" element={
            <AdminProtectedRoute>
              <AdminMain />
              <AppliedApllications />
            </AdminProtectedRoute>
          } />

          <Route path="/admin/login" element={
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          } />
        </Routes>
        {/* </Routes> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
