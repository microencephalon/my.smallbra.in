import { Menu, MenuDivider } from '@blueprintjs/core';
import Header from './Header';
import Spinner from './Spinner';
import TerminalDivider from './TerminalDivider';
import Item from './Item';

const SearchBarMenu = ({ items, renderItem, type, context }) => {
  const { menuRef, searchPerformed, loading, page, totalPages } = context;

  const renderMenu = (children) => (
    <Menu
      id='search-results-menu'
      className='mysb-omnibar-menu'
      ulRef={menuRef}
    >
      {children}
    </Menu>
  );

  if (type === 'resultless') {
    return renderMenu(
      <>
        <Header context={context} />
        <MenuDivider />
        <Item.NonIdeal type={type} />
      </>
    );
  } else if (type === 'queryless') {
    return renderMenu(
      <>
        <MenuDivider />
        <Item.NonIdeal type={type} />
      </>
    );
  } else if (type === 'resultful') {
    return renderMenu(
      <>
        {searchPerformed && <Header context={context} />}
        {items.map(renderItem)}
        {loading && <Spinner size={20} />}
        {searchPerformed && page >= totalPages && <TerminalDivider />}
      </>
    );
  }
};

SearchBarMenu.Header = Header;
SearchBarMenu.Spinner = Spinner;
SearchBarMenu.Item = Item;
SearchBarMenu.TerminalDivider = TerminalDivider;

export default SearchBarMenu;
