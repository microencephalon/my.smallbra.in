import { AnchorButton } from '@blueprintjs/core';

const MenuButton = ({ context, option }) => {
  const { navigate, activeMenuItem } = context;
  return (
    <AnchorButton
      id={`nav-${option.value}-btn`}
      className='nav-button'
      minimal={true}
      large={true}
      text={option.label}
      active={
        activeMenuItem === 'home' ? null : activeMenuItem === option.value
      }
      href={option.href}
      onClick={(e) => {
        e.preventDefault();
        navigate(option.href);
      }}
    />
  );
};

export default MenuButton;
