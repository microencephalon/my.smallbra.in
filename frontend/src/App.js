import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // MemoryRouter,
} from 'react-router-dom';
// DEBUG: When I run this, it gives me all of the errors where it can't resolve a bunch of stuff, and says it wants these packages installed: util url stream-http https-browserify stream-browserify assert querystring-es3 browserify-zlib path-browserify
// import { createProxyMiddleware } from 'http-proxy-middleware';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Error from './pages/Error';
import BlogPost from './pages/Blog/Post';
import Blogroll from './pages/Blog/Blogroll';
import Upload from './pages/Blog/Upload';
import ViewList from './pages/Blog/ViewList';
import Edit from './pages/Blog/Edit';
// import Blog from './pages/Blog';
// import Portfolio from './pages/Portfolio/Portfolio';
// import Resume from './pages/Resume/Resume';
// import About from './pages/About/About';

// TODO: Replace Bootstrap with Palantir Blueprint: https://blueprintjs.com/docs/
// TODO: https://thenounproject.com/icon/wall-construction-4497750/ -- Add this as an "Under Construction" splash

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/blog' element={<Blogroll />} />

          <Route path='/blog/post-template' element={<BlogPost />} />
          <Route path='/blog/:slug/:id' element={<BlogPost />} />

          <Route path='/blog/list' element={<ViewList />} />
          <Route path='/blog/edit/:id' element={<Edit />} />
          <Route path='/blog/upload' element={<Upload />} />
          {/* <Route path='/blog/:slug' element={<BlogPost />} /> */}
          <Route path='/portfolio' element={<Error responseCode={'503'} />} />
          {/* <Route path='/portfolio/bj-rotary' component={<Proxy />} /> -- will use NGINX instead*/}
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
