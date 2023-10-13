import { MenuItem } from '@blueprintjs/core';

const Header = ({ context }) => {
  const { item, items } = context;

  const text = (
    <span id='search-menu-header-text'>
      Search {items.length === 1 ? 'result' : 'results'} for <em>{item}</em>
    </span>
  );
  return (
    <>
      <MenuItem
        tagName='div'
        className='search-menu-header'
        textClassName='search-menu-header-text'
        text={text}
        disabled={true}
        roleStructure='menuitem'
      />
    </>
  );
};

export default Header;
