// frontend/src/components/Nav.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alignment,
  AnchorButton,
  Navbar,
  KeyComboTag,
} from '@blueprintjs/core';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';
import { getPathRoot } from '../../helpers/network';

const getNavHeadingClass = (pathname, currentClass, activeMenu) => {
  if (pathname === '/') {
    return currentClass !== 'remain-out' ? 'slide-out' : 'remain-out';
  } else {
    if (currentClass !== 'remain-in' && activeMenu) {
      return 'slide-in';
    } else {
      return 'remain-in';
    }
  }
};

const Nav = () => {
  const showResumeBtn = false;

  const { handleOmnibar } = useContext(OmnibarContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showShadow, setShowShadow] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [navHeadingClass, setNavHeadingClass] = useState(
    location.pathname === '/' ? 'remain-in' : 'remain-out'
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const newActiveMenuItem = getPathRoot(currentPath);
    const newNavHeadingClass = getNavHeadingClass(
      currentPath,
      navHeadingClass,
      newActiveMenuItem
    );

    setActiveMenuItem(newActiveMenuItem);

    setNavHeadingClass(newNavHeadingClass);
    if (newNavHeadingClass.includes('slide')) {
      setTimeout(() => {
        setNavHeadingClass('remain-' + (currentPath === '/' ? 'out' : 'in'));
      }, 1000);
    }
  }, [location.pathname, navHeadingClass]);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      id='navbar'
      className={`${showShadow ? 'navbar-shadow' : 'navbar-shadowless'}`}
      fixedToTop={true}
    >
      {/* // Center the navbar elements */}
      <Navbar.Group
        align={Alignment.LEFT}
        id='navbar-group-left'
        className={navHeadingClass}
      >
        <AnchorButton
          id='nav-home-btn'
          className='nav-button'
          minimal={true}
          large={true}
          text='home'
          href='/'
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        />
        <AnchorButton
          id='nav-blog-btn'
          className='nav-button'
          minimal={true}
          large={true}
          text='blog'
          active={activeMenuItem === 'blog'}
          href='/blog'
          onClick={(e) => {
            e.preventDefault();
            navigate('/blog');
          }}
        />
        <AnchorButton
          id='nav-portfolio-btn'
          className='nav-button'
          minimal={true}
          large={true}
          text='portfolio'
          active={activeMenuItem === 'portfolio'}
          href='/portfolio'
          onClick={(e) => {
            e.preventDefault();
            navigate('/portfolio');
          }}
        />
        {showResumeBtn && (
          <AnchorButton
            id='nav-resume-btn'
            className='nav-button'
            minimal={true}
            large={true}
            text='résumé'
            active={activeMenuItem === 'resume'}
            href='/resume'
            onClick={(e) => {
              e.preventDefault();
              navigate('/resume');
            }}
          />
        )}
        <AnchorButton
          id='nav-about-btn'
          className='nav-button'
          minimal={true}
          large={true}
          text='about'
          active={activeMenuItem === 'about'}
          href='/about'
          onClick={(e) => {
            e.preventDefault();
            navigate('/about');
          }}
        />
        <AnchorButton
          id='nav-search-btn'
          className='nav-button'
          minimal={true}
          large={true}
          text='search'
          onClick={handleOmnibar}
        />
        <div className='nav-search-btn-items'>
          <KeyComboTag className='nav-search-kbd' combo='⌘ + K' />
        </div>
      </Navbar.Group>
    </Navbar>
  );
};

export default Nav;
