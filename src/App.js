import './App.css';
import Navbar from './Components/Home/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './Components/Home/Main';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Slider from './Components/Home/Slider';

function App() {
  return (
    <Router>
      <div className="App bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Slider /> <Main /> </ProtectedRoute>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
