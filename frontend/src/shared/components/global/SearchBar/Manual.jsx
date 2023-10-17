// frontend/src/shared/components/global/SearchBar/Manual.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Omnibar } from '@blueprintjs/select';
import { useSearch } from '../../../hooks';
import { SEARCHBAR_OPTIONS } from '../../../../constants/searchBar';
import SearchBar from '../SearchBar';

const ManualSearchBar = ({ searchBarContext }) => {
  const navigate = useNavigate();

  const { SEARCHBAR_RESETS } = SEARCHBAR_OPTIONS;

  const context = searchBarContext;
  const {
    open,
    searchPerformed,
    setSearchPerformed,

    item,
    setItem,
    items,
    setItems,

    setPage,
    setLimit,

    setSelectedFilter,
    setSelectedSort,
    setIsClearedFilter,
    setIsClearedSort,
    setIsDialogOpen,

    handleSearchBarClose,
    handleSearchBarToggle,
  } = context;

  // DEBUG: Creates call when initializing, triggers useEffects for component. Same happens for SearchBarProvider in SearchBarContext
  const { handleSearchRequest, handleSearchReset } = useSearch('', context);

  const handleClose = () => {
    handleSearchReset();
    setSelectedFilter(SEARCHBAR_RESETS.selectedFilter);
    setSelectedSort(SEARCHBAR_RESETS.selectedSort);
    setIsClearedFilter(SEARCHBAR_RESETS.isClearedFilter);
    setIsClearedSort(SEARCHBAR_RESETS.isClearedSort);
    setIsDialogOpen(SEARCHBAR_RESETS.isDialogOpen);
    handleSearchBarClose();
  };

  const handleQueryChange = (newQuery) => {
    setItem(newQuery);
    setPage(SEARCHBAR_RESETS.page);
    setLimit(SEARCHBAR_RESETS.limit);
  };

  const handleItemRenderer = (itemData, menuItemProps) => (
    <SearchBar.Menu.Item.Card
      itemData={itemData}
      itemProps={menuItemProps}
      context={{ ...context, navigate, handleSearchReset }}
    />
  );

  const handleItemListRenderer = ({ items, renderItem }) => {
    if (searchPerformed) {
      if (items.length === 0 && item.trim()) {
        return (
          <SearchBar.Menu
            items={items}
            renderItem={null}
            type={'resultless'}
            context={context}
          />
        );
      } else if (!item.trim()) {
        return (
          <SearchBar.Menu
            items={items}
            renderItem={null}
            type={'queryless'}
            context={context}
          />
        );
      }
    }
    return (
      <SearchBar.Menu
        items={items}
        renderItem={renderItem}
        type={'resultful'}
        context={context}
      />
    );
  };

  const inputPropsContext = { ...context, handleSearchRequest };
  const searchBarInputProps = {
    ...SEARCHBAR_OPTIONS.INPUT_PROPS,
    onKeyDown: (event) =>
      SEARCHBAR_OPTIONS.KEYS.submit(event, {
        condition: !searchPerformed,
        actions: [handleSearchRequest],
      }),
    rightElement: (
      <SearchBar.Omnibar.RightElements context={inputPropsContext} />
    ),
    leftElement: <SearchBar.Omnibar.LeftElements context={inputPropsContext} />,
  };

  // DESC: SearchBar.Manual's `item` change useEffect
  useEffect(() => {
    setItems(Array.from(SEARCHBAR_RESETS.items));
    setSearchPerformed(SEARCHBAR_RESETS.searchPerformed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <SearchBar.Omnibar.Hotkeys context={{ handleSearchBarToggle }}>
      <SearchBar.Omnibar.HelpDialog isLiveSearch={false} context={context} />
      <Omnibar
        className='searchbar'
        onClose={() => handleClose()}
        query={item}
        onQueryChange={(newQuery) => handleQueryChange(newQuery)}
        itemRenderer={handleItemRenderer}
        itemListRenderer={handleItemListRenderer}
        isOpen={open}
        activeItem={item}
        items={items}
        inputProps={searchBarInputProps}
      />
    </SearchBar.Omnibar.Hotkeys>
  );
};

export default ManualSearchBar;
