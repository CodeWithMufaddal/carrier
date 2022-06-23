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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { useBanner } from './Context/BannerProvider';
import { useTheme } from './Context/ThemeProvider'


const App = () => {
  const { progress, setProgress } = useBanner();
  
  const { style } = useTheme();


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
          <Route path="/Application" element={<ProtectedRoute>  <Application />  </ProtectedRoute>} />

          {/* Special For Admin */}
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminMain />
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
