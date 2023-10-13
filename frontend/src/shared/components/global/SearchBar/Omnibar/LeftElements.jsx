import { Button, Icon } from '@blueprintjs/core';
import {
  SEARCH_ICONS,
  SEARCH_PREFIXES,
  SEARCHBAR_OPTIONS,
} from '../../../../../constants/searchBar';

const LeftElements = ({ context }) => {
  const {
    isSpecSearch,
    setIsSpecSearch,
    setSearchBarLeftIco,
    setItem,
    item,
    searchBarLeftIco,
  } = context;
  const { SEARCHBAR_RESETS } = SEARCHBAR_OPTIONS;

  const handleSearchLeftIcoMouseLeave = () => {
    const i = item;
    const { tag, title, category, summary, description } = SEARCH_PREFIXES;
    /* p = prefix */
    switch (true) {
      case tag.some((p) => i.startsWith(p)):
        setSearchBarLeftIco(SEARCH_ICONS.tag);
        break;
      case title.some((p) => i.startsWith(p)):
        setSearchBarLeftIco(SEARCH_ICONS.title);
        break;
      case category.some((p) => i.startsWith(p)):
        setSearchBarLeftIco(SEARCH_ICONS.category);
        break;
      case summary.some((p) => i.startsWith(p)):
      case description.some((p) => i.startsWith(p)):
        setSearchBarLeftIco(SEARCH_ICONS.summary || SEARCH_ICONS.description);
        break;
      default:
        setSearchBarLeftIco(SEARCHBAR_RESETS.searchBarLeftIco);
        break;
    }
  };

  if (isSpecSearch) {
    return (
      <Button
        className='search-mode-icon fade-in'
        aria-label='Signals the search query mode'
        minimal={true}
        outlined={false}
        onMouseEnter={() =>
          setSearchBarLeftIco(SEARCH_ICONS.removeSpecificQuery)
        }
        onMouseLeave={handleSearchLeftIcoMouseLeave}
        icon={<Icon icon={searchBarLeftIco} />}
        onClick={() => {
          setIsSpecSearch(!isSpecSearch);
          setItem(SEARCHBAR_RESETS.item);
        }}
      />
    );
  }
  return (
    <Icon
      id='search-mode-icon-default'
      icon={SEARCH_ICONS.generalSearch}
      aria-label='Signals the search query mode is general'
    />
  );
};

export default LeftElements;
