import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Error from './pages/Error';
// import Blog from './pages/Blog';
// import Portfolio from './pages/Portfolio';
// import Resume from './pages/Resume';
// import About from './pages/About';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/error' element={<Error responseCode={'503'} />} />
          <Route path='/blog' element={<Error responseCode={'503'} />} />
          <Route path='/portfolio' element={<Error responseCode={'503'} />} />
          <Route path='/resume' element={<Error responseCode={'503'} />} />
          <Route path='/about' element={<Error responseCode={'503'} />} />
          {/* https://bit.ly/3YSClU2 React - Redirect to a default path if path doesn't exist */}
          <Route path='*' element={<Error responseCode={'404'} />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} transition={Zoom} />
    </>
  );
}

export default App;
