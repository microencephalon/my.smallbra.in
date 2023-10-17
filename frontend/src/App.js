// frontend/src/App.js
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HotkeysProvider } from '@blueprintjs/core';

import { GlobalContext, GlobalProvider } from './store/contexts/GlobalContext';
import { AuthProvider } from './store/contexts/AuthContext';
import {
  SearchBarContext,
  SearchBarProvider,
} from './store/contexts/SearchBarContext';

import AuthPortal from './features/Public/AuthPortal';
import AdminPortal from './features/Admin';
import Home from './features/Public/Home';
import Blog from './features/Public/Blog';
import Portfolio from './features/Public/Portfolio';
import Resume from './features/Public/Resume';
import About from './features/Public/About';

import Global from './shared/components/global';
import PrivateRoute from './shared/components/routes/PrivateRoute';

import { useClickOutsideNav, useScalingTopPadding } from './shared/hooks';

const isLiveSearch = process.env.LIVE_SEARCH_ENABLED === 'true';

function App() {
  return (
    <GlobalProvider>
      <HotkeysProvider>
        <SearchBarProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* The routes here won't display the Nav component */}
                <Route path='/auth' element={<AuthPortal />} />
                <Route
                  path='/admin/*'
                  element={<PrivateRoute element={<AdminPortal />} />}
                />
                {/* The routes here will display the Nav component */}
                <Route path='/*' element={<AppRoutes />} />
              </Routes>
            </Router>
          </AuthProvider>
        </SearchBarProvider>
      </HotkeysProvider>
    </GlobalProvider>
  );
}

// This was created since SearchBarContext needs to be nested within SearchBarProvider
const AppRoutes = () => {
  const globalContext = useContext(GlobalContext);
  const searchBarContext = useContext(SearchBarContext);

  const { blur, isNavMenuOpen, isPageNarrow } = globalContext;
  const context = { global: globalContext, searchBar: searchBarContext };

  // Scales padding so content under the Navbar maintains relative consistency padding-top regardless of width scale.
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
  setPadding(); // For initial render
  useScalingTopPadding({ action: setPadding, context: globalContext });

  useClickOutsideNav(globalContext);

  return (
    <>
      {isPageNarrow ? <Global.Nav.Narrow context={context} /> : null}
      <div
        id='page-container'
        className={`
          ${blur ? 'blur-content' : ''}
          ${isNavMenuOpen ? ' disable-interaction' : ''}`}
      >
        {!isPageNarrow ? <Global.Nav.Wide context={context} /> : null}
        <div id='content-wrap' className='center-content'>
          <Routes>
            <Route exact path='/' element={<Home context={context} />} />
            <Route path='/blog/*' element={<Blog context={context} />} />
            <Route
              path='/portfolio/*'
              element={<Portfolio context={context} />}
            />
            <Route path='/resume' element={<Resume />} />
            <Route path='/about' element={<About />} />
            <Route
              path='*'
              element={<Global.ErrorCard responseCode={'404'} />}
            />
          </Routes>
          {!isLiveSearch ? (
            <Global.SearchBar.Manual searchBarContext={searchBarContext} />
          ) : (
            <Global.SearchBar.Live searchBarContext={searchBarContext} />
          )}
        </div>
        <div className='center-content'>
          {isPageNarrow ? <hr /> : null}
          <Global.Footer />
        </div>
      </div>
    </>
  );
};

export default App;
