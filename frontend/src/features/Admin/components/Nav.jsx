// frontend/src/components/Nav.jsx
import React, { useState } from 'react';
import {
  Alignment,
  Button,
  Navbar,
  Menu,
  OverlayToaster,
  Position,
  Intent,
  Popover,
  MenuItem,
} from '@blueprintjs/core';
import { Link, useNavigate } from 'react-router-dom';

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const Nav = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuClick = (path, menu) => {
    setActiveMenuItem(menu);
    navigate(path);
  };

  // Define the dropdown menu
  const blogMenu = (
    <Menu style={{ fontSize: '87.5%' }}>
      <MenuItem
        icon='list-columns'
        text='List'
        onClick={() => handleMenuClick('/admin/blog', 'blog')}
      />
      <MenuItem
        icon='upload'
        text='Upload'
        className='bp5-minimal'
        onClick={() => handleMenuClick('/admin/blog/upload-post', 'blog')}
      />
    </Menu>
  );

  const portfolioMenu = (
    <Menu style={{ fontSize: '87.5%' }}>
      <MenuItem
        icon='list-columns'
        text='List'
        onClick={() => handleMenuClick('/admin/portfolio', 'portfolio')}
      />
      <MenuItem
        icon='upload'
        text='Upload'
        onClick={() =>
          handleMenuClick('/admin/portfolio/upload-artifact', 'portfolio')
        }
      />
    </Menu>
  );

  const resumeMenu = (
    <Menu style={{ fontSize: '87.5%' }}>
      <MenuItem
        icon='list-columns'
        text='List'
        onClick={() => handleMenuClick('/admin/resumes', 'resume')}
      />
      <MenuItem
        icon='upload'
        text='Upload'
        onClick={() =>
          handleMenuClick('/admin/resumes/upload-resume', 'resume')
        }
      />
    </Menu>
  );

  return (
    <Navbar fixedToTop={true}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading style={{ paddingLeft: '1.25%' }}>
          <Link to={'/admin'}>
            <img
              className='admin-nav-heading'
              src='http://localhost:8081/storage/images/icons/smbrIcon.svg'
              alt='Logo'
            />
          </Link>
        </Navbar.Heading>
        <Navbar.Divider />
        <Popover
          interactionKind='hover'
          minimal={true}
          content={blogMenu}
          position='bottom'
        >
          <Button
            className='bp5-minimal'
            icon='manually-entered-data'
            text='Blog'
            active={activeMenuItem === 'blog'}
          />
        </Popover>
        <Popover
          interactionKind='hover'
          minimal={true}
          content={portfolioMenu}
          position='bottom'
        >
          <Button
            className='bp5-minimal'
            icon='projects'
            text='Portfolio'
            active={activeMenuItem === 'portfolio'}
          />
        </Popover>
        <Popover
          interactionKind='hover'
          minimal={true}
          content={resumeMenu}
          position='bottom'
        >
          <Button
            className='bp5-minimal'
            icon='mugshot'
            text='Résumé'
            active={activeMenuItem === 'resume'}
          />
        </Popover>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Navbar.Divider />
        <Button
          className='bp5-minimal'
          icon='cog'
          alt='Account Settings'
          text=''
          onClick={() => navigate('/admin/account-settings')}
        />
        <Button
          className='bp5-minimal'
          icon='log-out'
          alt='Log out'
          text=''
          onClick={() => {
            localStorage.removeItem('token'); // remove the token from local storage
            navigate('/auth'); // navigate to the main page or login page after logging out
            AppToaster.show({
              message: 'Logged out successfully. See you next time.',
              isCloseButtonShown: false,
              intent: Intent.SUCCESS,
              timeout: 2500,
            });
          }}
        />
      </Navbar.Group>
    </Navbar>
  );
};

export default Nav;
