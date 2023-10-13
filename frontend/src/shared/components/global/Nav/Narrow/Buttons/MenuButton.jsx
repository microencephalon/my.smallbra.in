import classNames from 'classnames';
import { Button, Icon, IconSize } from '@blueprintjs/core';
import { RxDropdownMenu } from 'react-icons/rx';

const MenuButton = ({ context }) => {
  const { isNavMenuOpen, activeMenuItem, setIsNavMenuOpen } = context;

  const currButtonClass = classNames('narrow-navbar-btn', {
    'nav-menu-open': isNavMenuOpen,
  });

  return (
    <Button
      id={
        !isNavMenuOpen
          ? 'narrow-navbar-current-btn'
          : 'narrow-navbar-close-menu-btn'
      }
      className={currButtonClass}
      aria-label={
        isNavMenuOpen ? 'Close the navigation menu' : 'Open the navigation menu'
      }
      icon={
        !isNavMenuOpen ? (
          <RxDropdownMenu />
        ) : (
          <Icon
            className='fade-in'
            icon='cross'
            size={IconSize.LARGE}
            color='#CD071E'
          />
        )
      }
      fill={true}
      text={!isNavMenuOpen ? activeMenuItem : ''}
      onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
    />
  );
};

export default MenuButton;
