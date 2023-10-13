import { MenuItem } from '@blueprintjs/core';
import {
  FIELDS_FOR_HIGHLIGHT,
  SEARCH_MODES,
} from '../../../../../../constants/searchBar';
import { highlightQuery as handleHighlight } from '../../../../../utils/string';
import SearchBar from '../../../SearchBar';

const Card = ({ context, itemData, itemProps }) => {
  const {
    searchMode,
    specificQuery,
    item,
    lastLoadedPage,
    navigate,
    handleSearchReset,
    handleSearchBarClose,
  } = context;

  const highlighted = {};
  FIELDS_FOR_HIGHLIGHT.forEach((field) => {
    highlighted[field] = handleHighlight({
      searchMode: searchMode,
      searchModeStr: field,
      specificQuery: specificQuery,
      val: itemData[field],
      item: item,
      highlightClass:
        field === SEARCH_MODES.title
          ? 'mysb-omnibar-hl-yield-title'
          : undefined,
    });
  });

  const handleMenuItemClick = (itemData) => {
    return () => {
      handleSearchReset();
      handleSearchBarClose();
      navigate(`/${itemData.itemType}/${itemData.slug}/${itemData.refId}`);
    };
  };

  const shouldFadeIn = itemData.pageNum > lastLoadedPage;

  return (
    <MenuItem
      onClick={handleMenuItemClick(itemData)}
      key={itemData.refId}
      text={
        <SearchBar.Menu.Item.Content
          val={itemData}
          highlighted={highlighted}
          context={context}
        />
      }
      active={itemProps.modifiers.active}
      roleStructure='listoption'
      className={`search-menu-item ${shouldFadeIn ? 'fade-in' : ''}`}
    />
  );
};

export default Card;
