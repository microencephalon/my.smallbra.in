import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Alignment, Navbar } from '@blueprintjs/core';
import { useNavbar } from '../../../../hooks';
import { MENU_OPTIONS } from '../../../../../constants/navbar';

import Buttons from './Buttons';

const NavWide = ({ context }) => {
  const { handleSearchBar } = context.searchBar;
  const { setBlur } = context.global;
  const navigate = useNavigate();
  const { activeMenuItem, navHeadingClass } = useNavbar('isWide');
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = classNames({
    'navbar-shadow': showShadow,
    'navbar-shadowless': !showShadow,
  });

  const contextItems = {
    handleSearchBar,

    setBlur,

    navigate,

    activeMenuItem,
    navHeadingClass,

    showShadow,
    setShowShadow,
  };

  return (
    <Navbar id='navbar' className={navbarClass} fixedToTop={true}>
      <Navbar.Group
        align={Alignment.LEFT}
        id='navbar-group-left'
        className={navHeadingClass}
      >
        {MENU_OPTIONS.map((option) => (
          <Buttons.Menu context={contextItems} option={option} />
        ))}
        <Buttons.Search context={contextItems} />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavWide;
