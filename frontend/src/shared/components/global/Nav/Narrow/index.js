import { useNavigate } from 'react-router-dom';
import { Navbar, ButtonGroup } from '@blueprintjs/core';

import { useNavbar } from '../../../../hooks';

import Menu from './Menu';
import Buttons from './Buttons';

const NavNarrow = ({ context }) => {
  const {
    setBlur,
    blurNarrowNav,
    setBlurNarrowNav,
    isNavMenuOpen,
    setIsNavMenuOpen,
  } = context.global;
  const { handleSearchBarToggle, open: isOmnibarOpen } = context.searchBar;

  const navigate = useNavigate();

  const { activeMenuItem } = useNavbar();

  const contextItems = {
    handleSearchBarToggle,
    isOmnibarOpen,
    setBlur,
    blurNarrowNav,
    setBlurNarrowNav,
    isNavMenuOpen,
    setIsNavMenuOpen,
    navigate,
    activeMenuItem,
  };

  return (
    <Navbar
      id='navbar'
      className={`
      narrow-navbar 
      ${blurNarrowNav ? 'blur-content' : ''}
      ${isNavMenuOpen ? ' disable-interaction' : ''}
      `}
      fixedToTop={false}
    >
      <ButtonGroup
        id='narrow-navbar-btn-group'
        minimal={true}
        fill={true}
        large={true}
        vertical={true}
      >
        <Buttons.Search context={contextItems} />
        <Menu
          context={contextItems}
          onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        >
          <Buttons.Menu context={contextItems} />
        </Menu>
      </ButtonGroup>
    </Navbar>
  );
};

export default NavNarrow;
