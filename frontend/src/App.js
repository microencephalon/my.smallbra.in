// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HotkeysProvider } from '@blueprintjs/core';
import { AuthProvider } from './store/contexts/AuthContext';
import { OmnibarProvider } from './store/contexts/OmnibarContext';
import Home from './pages/Home';
import Error from './pages/Error';
import Resume from './components/resume/ResumeLayout';
import Auth from './pages/Auth';
import About from './pages/About';
import Admin from './components/admin/AdminLayout';
import Blog from './components/blog/BlogLayout';
import Portfolio from './components/portfolio/PortfolioLayout';
import PrivateRoute from './components/common/PrivateRoute';
import Nav from './components/common/Nav';
import SBOmnibar from './components/common/SBOmnibar';
import SBOmnibarLive from './components/common/SBOmnibarLive';

// TODO: https://thenounproject.com/icon/wall-construction-4497750/ -- Add this as an "Under Construction" splash

const isLiveSearch = process.env.LIVE_SEARCH_ENABLED === 'true';

function App() {
  return (
    <HotkeysProvider>
      <OmnibarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* The routes here won't display the Nav component */}
              <Route path='/auth' element={<Auth />} />
              <Route
                path='/admin/*'
                element={<PrivateRoute component={Admin} />}
              />

              {/* The routes here will display the Nav component */}
              <Route path='/*' element={<AppRoutes />} />
            </Routes>
          </Router>
        </AuthProvider>
      </OmnibarProvider>
    </HotkeysProvider>
  );
}

// This was created since OmnibarContext needs to be nested within OmnibarProvider
const AppRoutes = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/blog/*' element={<Blog />} />
        <Route path='/portfolio/*' element={<Portfolio />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error responseCode={'404'} />} />
      </Routes>
      {!isLiveSearch ? <SBOmnibar /> : <SBOmnibarLive />}
    </>
  );
};

export default App;
