import { MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import {
  MENU_OPTIONS,
  getNarrowMenuOptions,
} from '../../../../../constants/navbar';

const Menu = ({ children, context }) => {
  const { navigate, activeMenuItem, setIsNavMenuOpen } = context;

  const popoverProps = getNarrowMenuOptions(context).popover;

  const SelectionItem = ({ item, active, handleClick }) => {
    const { value, label } = item;
    return (
      <MenuItem
        active={active}
        className={
          activeMenuItem === value
            ? 'narrow-nav-menu-item-active'
            : 'narrow-nav-menu-item'
        }
        key={value}
        onClick={() => {
          setIsNavMenuOpen(false);
          handleClick();
        }}
        text={label}
        roleStructure='menuitem'
      />
    );
  };

  return (
    <Select
      items={MENU_OPTIONS}
      onItemSelect={(item) => navigate(item.href)}
      activeItem={activeMenuItem}
      itemRenderer={(item, { handleClick, modifiers }) => (
        <SelectionItem
          item={item}
          handleClick={handleClick}
          active={modifiers.active}
        />
      )}
      filterable={false}
      popoverProps={popoverProps}
    >
      {children}
    </Select>
  );
};

export default Menu;
