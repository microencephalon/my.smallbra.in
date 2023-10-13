import { AnchorButton, KeyComboTag } from '@blueprintjs/core';
const SearchButton = ({ context }) => {
  const { setBlur, handleSearchBar } = context;

  return (
    <>
      <AnchorButton
        id='nav-search-btn'
        className='nav-button'
        minimal={true}
        large={true}
        text='search'
        onClick={() => {
          setBlur(true);
          handleSearchBar();
        }}
      />
      <div className='nav-search-btn-items'>
        <KeyComboTag className='nav-search-kbd' combo='⌘ + K' />
      </div>
    </>
  );
};

export default SearchButton;
