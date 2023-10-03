import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Navbar,
  MenuItem,
  Icon,
  IconSize,
  Button,
  ButtonGroup,
  Position,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';
import { GlobalContext } from '../../store/contexts/GlobalContext';
import { getPathRoot } from '../../helpers/network';
import { RxDropdownMenu } from 'react-icons/rx';

const MENU_OPTIONS = [
  {
    value: 'home',
    label: 'home',
    href: '/',
  },
  {
    value: 'blog',
    label: 'blog',
    href: '/blog',
  },
  {
    value: 'portfolio',
    label: 'portfolio',
    href: '/portfolio',
  },
  // {
  //   value: 'resume',
  //   label: 'résumé',
  //   href: '/resume',
  // },
  {
    value: 'about',
    label: 'about',
    href: '/about',
  },
];

const NavNarrow = () => {
  const NavNarrowMenu = Select;

  const { handleOmnibarToggle, open: isOmnibarOpen } =
    useContext(OmnibarContext);
  const { setBlur, isNavMenuOpen, setIsNavMenuOpen } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const newActiveMenuItem = getPathRoot(currentPath); // Use getPathRoot here
    setActiveMenuItem(newActiveMenuItem);
  }, [location.pathname]);

  return (
    <Navbar id='navbar' className='narrow-navbar' fixedToTop={false}>
      <ButtonGroup
        id='narrow-navbar-btn-group'
        minimal={true}
        fill={true}
        large={true}
        vertical={true}
      >
        <Button
          id='nav-search-btn-narrow'
          className='narrow-navbar-btn'
          icon={<Icon icon='search' color='#FFF' size={IconSize.LARGE} />}
          onClick={() => {
            handleOmnibarToggle();
          }}
        />
        <NavNarrowMenu
          items={MENU_OPTIONS}
          onItemSelect={(item) => {
            navigate(item.href);
            setActiveMenuItem(item.value);
          }}
          activeItem={activeMenuItem}
          itemRenderer={(item, { handleClick, modifiers }) => {
            return (
              <MenuItem
                active={modifiers.active}
                className={
                  activeMenuItem === item.value
                    ? 'narrow-navbar-menu-item-active'
                    : 'narrow-navbar-menu-item'
                }
                key={item.value}
                onClick={() => {
                  setIsNavMenuOpen(false);
                  handleClick();
                }}
                text={item.label}
                roleStructure='menuitem'
              />
            );
          }}
          filterable={false}
          popoverProps={{
            isOpen: isNavMenuOpen,
            position: Position.BOTTOM,
            minimal: true,
            interactionKind: 'click',
            canEscapeKeyClose: true,
            hoverCloseDelay: 0,
            matchTargetWidth: true,
            onOpening: () => {
              setBlur(true);
            },
            onClosing: () => {
              if (isOmnibarOpen === false) setBlur(false);
            },
          }}
        >
          <Button
            id='narrow-navbar-current-btn'
            className={`narrow-navbar-btn${
              !isNavMenuOpen ? '' : ' nav-menu-open'
            }`}
            icon={
              !isNavMenuOpen ? (
                <RxDropdownMenu />
              ) : (
                <Icon
                  id='narrow-navbar-close-menu-btn'
                  clasName='fade-in'
                  icon='cross'
                  size={IconSize.LARGE}
                  color='#141414'
                />
              )
            }
            text={!isNavMenuOpen ? activeMenuItem : ''}
            onClick={() => {
              setIsNavMenuOpen(!isNavMenuOpen);
            }}
          />
        </NavNarrowMenu>
      </ButtonGroup>
    </Navbar>
  );
};

export default NavNarrow;
