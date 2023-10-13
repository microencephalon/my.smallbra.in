import { Button, Icon, IconSize } from '@blueprintjs/core';

const SearchButton = ({ context }) => {
  const { handleSearchBarToggle } = context;

  return (
    <Button
      id='nav-search-btn-narrow'
      className='narrow-navbar-btn'
      icon={<Icon icon='search' color='#FFF' size={IconSize.LARGE} />}
      onClick={handleSearchBarToggle}
      aria-label='Toggle Search'
    />
  );
};
export default SearchButton;
