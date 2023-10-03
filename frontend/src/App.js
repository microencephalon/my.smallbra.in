// frontend/src/App.js
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HotkeysProvider } from '@blueprintjs/core';
import { GlobalContext, GlobalProvider } from './store/contexts/GlobalContext';
import { AuthProvider } from './store/contexts/AuthContext';
import { OmnibarProvider } from './store/contexts/OmnibarContext';
import Home from './pages/Home';
import ErrorCard from './components/global/ErrorCard';
import Resume from './components/resume/ResumeLayout';
import Auth from './pages/Auth';
import About from './pages/About';
import Admin from './components/admin/AdminLayout';
import Blog from './components/blog/BlogLayout';
import Portfolio from './components/portfolio/PortfolioLayout';
import PrivateRoute from './components/routes/PrivateRoute';
import Nav from './components/global/Nav';
import NavNarrow from './components/global/NavNarrow';
import Footer from './components/global/Footer';
import SBOmnibar from './components/common/SBOmnibar';
import SBOmnibarLive from './components/common/SBOmnibarLive';

// TODO: https://thenounproject.com/icon/wall-construction-4497750/ -- Add this as an "Under Construction" splash

const isLiveSearch = process.env.LIVE_SEARCH_ENABLED === 'true';

function App() {
  return (
    <GlobalProvider>
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
    </GlobalProvider>
  );
}

// This was created since OmnibarContext needs to be nested within OmnibarProvider
const AppRoutes = () => {
  const { blur, isNavMenuOpen, setIsNavMenuOpen, isPageNarrow } =
    useContext(GlobalContext);

  const setPadding = () => {
    const navbar = document.getElementById('navbar');
    const contentWrap = document.getElementById('content-wrap');
    if (navbar && contentWrap) {
      const navbarHeight = navbar.offsetHeight;
      const scaleFactor = isPageNarrow ? 0.2 : 1.6; // Scale factor changes based on isNavNarrow
      const padding = navbarHeight * scaleFactor;
      contentWrap.style.paddingTop = `${padding}px`;
    }
  };

  useEffect(() => {
    setPadding(); // Initial setting

    // Update on window resize
    window.addEventListener('resize', setPadding);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setPadding);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageNarrow]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest('#narrow-navbar-current-btn') ||
        event.target.closest(
          'div.bp5-portal:has(a.narrow-navbar-menu-item) .bp5-popover-transition-container'
        )
      ) {
        return; // Do nothing
      }
      setIsNavMenuOpen(false);
    };

    // Attach the click event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: Remove event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      {isPageNarrow ? <NavNarrow /> : null}
      <div
        id='page-container'
        className={`
          ${blur ? 'blur-content' : ''}
          ${isNavMenuOpen ? ' disable-interaction' : ''}`}
      >
        {!isPageNarrow ? <Nav /> : null}
        <div id='content-wrap' className='center-content'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/blog/*' element={<Blog />} />
            <Route path='/portfolio/*' element={<Portfolio />} />
            <Route path='/resume' element={<Resume />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<ErrorCard responseCode={'404'} />} />
          </Routes>
          {!isLiveSearch ? <SBOmnibar /> : <SBOmnibarLive />}
        </div>
        <div className='center-content'>
          {isPageNarrow ? <hr /> : null}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
