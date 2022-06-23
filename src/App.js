import React, { useRef } from 'react'
import './App.css';
import Navbar from './Components/Home/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './Components/Home/Main';
import AdminMain from './Components/Admin/Main';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import LoadingBar from 'react-top-loading-bar'

import Footer from './Components/Home/Footer';
import Application from './Components/Application/Application';
import { useStateProvider } from './Context/StateProvider';
import GoToTop from './Components/GoToTop';


const App = () => {
  const { style, progress, seTprogress, tprogress, setProgress } = useStateProvider();

  const ref = React.useRef(null);

  React.useEffect(() => {
    // ref.current.continuousStart()

    setProgress(100)



  }, [])

  return (
    <Router>
      <div className={`App bg-${style.Primary} `}>
        <GoToTop />
        <LoadingBar
          color="red"
          height={"3px"}
          progress={progress}
          // progress={50}
          onLoaderFinished={() => setProgress(0)}
        />
        {/* <LoadingBar
          color="red"
          height={"3px"}
          progress={tprogress}
          // progress={50}
          ref={ref}
          onLoaderFinished={() => seTprogress(10)}
        /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute>  <Main />  </ProtectedRoute>} />
          <Route path="/Application" element={<ProtectedRoute>  <Application />  </ProtectedRoute>} />

          {/* Special For Admin */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminMain />
            </ProtectedRoute>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
