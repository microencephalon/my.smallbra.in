// frontend/src/components/Nav.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alignment,
  Button,
  Navbar,
  Colors,
  Icon,
  Text,
  KeyComboTag,
} from '@blueprintjs/core';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';

const getPathRoot = (pathname) => {
  if (pathname.startsWith('/blog')) {
    return 'blog';
  } else if (pathname.startsWith('/portfolio')) {
    return 'portfolio';
  } else if (pathname.startsWith('/resume')) {
    return 'resume';
  } else if (pathname.startsWith('/about')) {
    return 'about';
  } else {
    return null;
  }
};

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
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [navHeadingClass, setNavHeadingClass] = useState(
    location.pathname === '/' ? 'remain-in' : 'remain-out'
  );
  // const [isDark, setIsDark] = useState(false);

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
      }, 300);
    }
  }, [location.pathname, navHeadingClass]);

  return (
    <Navbar className='mysb-navbar' fixedToTop={true}>
      <Navbar.Group
        align={Alignment.LEFT}
        id='navbar-group'
        className={navHeadingClass}
      >
        <Navbar.Heading style={{ paddingLeft: '2%' }}>
          <img
            className='nav-heading'
            src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
            alt='Logo'
            style={{
              width: '24px',
              height: 'auto',
              marginTop: 3,
            }}
            onClick={() => navigate('/')}
          />
        </Navbar.Heading>
        <Navbar.Divider
          style={{
            borderLeftColor: 'black',
            borderWidth: 1.5,
            height: 22.5,
          }}
        />
        <Button
          className='nav-button'
          minimal={true}
          large={true}
          icon={<Icon icon='manually-entered-data' color={Colors.BLACK} />}
          text={
            <Text
              tagName='span'
              style={{
                color: Colors.BLACK,
                fontFamily: 'Oswald',
                fontWeight: 400,
              }}
            >
              Blog
            </Text>
          }
          active={activeMenuItem === 'blog'}
          onClick={() => navigate('/blog')}
        />
        <Button
          className='nav-button'
          minimal={true}
          large={true}
          icon={<Icon icon='projects' color={Colors.BLACK} />}
          text={
            <Text
              tagName='span'
              style={{
                color: Colors.BLACK,
                fontFamily: 'Oswald',
                fontWeight: 400,
              }}
            >
              Portfolio
            </Text>
          }
          active={activeMenuItem === 'portfolio'}
          onClick={() => navigate('/portfolio')}
        />
        {showResumeBtn && (
          <Button
            className='nav-button'
            minimal={true}
            large={true}
            // icon={<Icon icon='mugshot' color={Colors.BLACK} />}
            text={
              <Text
                tagName='span'
                style={{
                  color: Colors.BLACK,
                  fontFamily: 'Oswald',
                  fontWeight: 400,
                }}
              >
                Résumé
              </Text>
            }
            active={activeMenuItem === 'resume'}
            onClick={() => navigate('/resume')}
          />
        )}
        <Button
          className='nav-button'
          minimal={true}
          large={true}
          icon={<Icon icon='info-sign' color={Colors.BLACK} />}
          text={
            <Text
              tagName='span'
              style={{
                color: Colors.BLACK,
                fontFamily: 'Oswald',
                fontWeight: 400,
              }}
            >
              About
            </Text>
          }
          active={activeMenuItem === 'about'}
          onClick={() => navigate('/about')}
        />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {/* TODO: Style this  */}
        <Button
          className='mysb-omnibar-search-btn'
          minimal={true}
          alignText={Alignment.LEFT}
          icon={<Icon icon='search' svgProps={{ fill: '#9D9C9C' }} />}
          onClick={handleOmnibar}
        >
          <div className='mysb-omnibar-search-btn-items'>
            <span className='mysb-omnibar-search-btn-text'>Search...</span>
            <KeyComboTag className='mysb-omnibar-kbd' combo='⌘ + K' />
          </div>
        </Button>
      </Navbar.Group>
    </Navbar>
  );
};

export default Nav;
