import React from 'react';
import {
  // MemoryRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
          <Route exact path='/' element={<Home />} />
          <Route path='/blog' element={<Error responseCode={'503'} />} />
          <Route path='/portfolio' element={<Error responseCode={'503'} />} />
          <Route path='/resume' element={<Error responseCode={'503'} />} />
          <Route path='/about' element={<Error responseCode={'503'} />} />
          {/* https://bit.ly/3YSClU2 React - Redirect to a default path if path doesn't exist */}
          <Route path='*' element={<Error responseCode={'404'} />} />
          <Route
            path='/manifest.json'
            element={<Error responseCode={'403'} />}
          />
          <Route path='/robot.txt' element={<Error responseCode={'403'} />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} transition={Zoom} />
    </>
  );
}

export default App;
