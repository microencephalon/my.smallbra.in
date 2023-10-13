// frontend/src/store/contexts/SearchBarContext.jsx
import { createContext, useState, useRef, useContext } from 'react';

import { GlobalContext } from './GlobalContext';
import { SEARCHBAR_OPTIONS } from '../../constants/searchBar';
import { searchBar as searchBarElements } from '../elements/global';
import { waitForElement } from '../../shared/utils/dom';

const { SEARCHBAR_RESETS: RESETS } = SEARCHBAR_OPTIONS;

// Initialize the context with default values
export const SearchBarContext = createContext({
  menuRef: () => {},
  open: RESETS.open,
  setOpen: () => {},
  item: RESETS.item,
  setItem: () => {},
  items: Array.from(RESETS.items),
  setItems: () => {},
  loading: RESETS.loading,
  setLoading: () => {},
  isSpecSearch: RESETS.isSpecSearch,
  setIsSpecSearch: () => {},
  searchBarLeftIco: RESETS.searchBarLeftIco,
  setSearchBarLeftIco: () => {},
  searchMode: RESETS.searchMode,
  setSearchMode: () => {},
  tagQueries: Array.from(RESETS.items),
  setTagQueries: () => {},
  specificQuery: RESETS.specificQuery,
  setSpecificQuery: () => {},
  searchPerformed: RESETS.searchPerformed,
  setSearchPerformed: () => {},
  sort: RESETS.sort,
  setSort: () => {},
  type: RESETS.type,
  setType: () => {},
  page: RESETS.page,
  setPage: () => {},
  lastLoadedPage: RESETS.lastLoadedPage,
  setLastLoadedPage: () => {},
  totalPages: RESETS.totalPages,
  setTotalPages: () => {},
  limit: RESETS.limit,
  setLimit: () => {},
  isDialogOpen: RESETS.isDialogOpen,
  setIsDialogOpen: () => {},
  selectedFilter: RESETS.selectedFilter,
  setSelectedFilter: () => {},
  selectedSort: RESETS.selectedSort,
  setSelectedSort: () => {},
  isClearedFilter: RESETS.isClearedFilter,
  setIsClearedFilter: () => {},
  isClearedSort: RESETS.isClearedSort,
  setIsClearedSort: () => {},
  handleSearchBar: () => {},
  handleSearchBarClose: () => {},
  handleSearchBarToggle: () => {},
  openSearchBarWithQuery: async () => {},
});

export const SearchBarProvider = ({ children }) => {
  const { setBlur, setBlurNarrowNav, isPageNarrow } = useContext(GlobalContext);

  const menuRef = useRef(null);

  const [open, setOpen] = useState(RESETS.open);

  const [item, setItem] = useState(RESETS.item); // set to Initial item, not default
  const [items, setItems] = useState(Array.from(RESETS.items));
  const [loading, setLoading] = useState(RESETS.loading);
  const [isSpecSearch, setIsSpecSearch] = useState(RESETS.isSpecSearch);
  const [searchBarLeftIco, setSearchBarLeftIco] = useState(
    RESETS.searchBarLeftIco
  );
  const [searchMode, setSearchMode] = useState(RESETS.searchMode);
  const [tagQueries, setTagQueries] = useState(Array.from(RESETS.tagQueries));
  const [specificQuery, setSpecificQuery] = useState(RESETS.specificQuery);
  const [searchPerformed, setSearchPerformed] = useState(
    RESETS.searchPerformed
  );
  const [sort, setSort] = useState(RESETS.sort);
  const [type, setType] = useState(RESETS.type);
  const [page, setPage] = useState(RESETS.page);
  const [lastLoadedPage, setLastLoadedPage] = useState(RESETS.lastLoadedPage);
  const [totalPages, setTotalPages] = useState(RESETS.totalPages);
  const [limit, setLimit] = useState(RESETS.limit);

  const [isDialogOpen, setIsDialogOpen] = useState(RESETS.isDialogOpen);
  const [selectedFilter, setSelectedFilter] = useState(RESETS.selectedFilter);
  const [selectedSort, setSelectedSort] = useState(RESETS.selectedSort); // Set default sort option
  const [isClearedFilter, setIsClearedFilter] = useState(
    RESETS.isClearedFilter
  );
  const [isClearedSort, setIsClearedSort] = useState(RESETS.isClearedSort);

  const handleSearchBar = () => setOpen((prevOpen) => !prevOpen);

  let scrollLockTimeout;
  let scrollPosition;

  // Function to lock the scroll position
  const lockScroll = () => {
    window.scrollTo(0, scrollPosition);
  };

  const handleSearchBarClose = () => {
    setBlur(false);
    // isPageNarrow && setBlurNarrowNav((prevBlur) => !prevBlur);
    setOpen(RESETS.open); // Assuming setOpen sets the state for SearchBar's open/close

    // Capture current scroll position
    scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Attach the scroll event listener to lock the scroll
    window.addEventListener('scroll', lockScroll);

    // Clear any existing timeouts
    clearTimeout(scrollLockTimeout);

    // Remove the scroll lock after 1 second
    scrollLockTimeout = setTimeout(() => {
      window.removeEventListener('scroll', lockScroll);
    }, 500);
  };

  const handleSearchBarToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setBlur((prevBlur) => !prevBlur);
    // isPageNarrow && setBlurNarrowNav((prevBlur) => !prevBlur);
  };

  const openSearchBarWithQuery = async (query, timeout = 5000) => {
    try {
      handleSearchBarToggle(); // Open the SearchBar

      // Wait for the input element to appear in the DOM
      const inputElement = await waitForElement(
        searchBarElements.inputField,
        timeout
      );
      inputElement.value = query;
      setItem(query);

      // Wait for the button to appear in the DOM
      const submitSearchBtn = await waitForElement(
        searchBarElements.buttons.submitQuery,
        timeout
      );
      submitSearchBtn.click();
    } catch (error) {
      console.error(error.message); // Log the error message
    }
  };

  return (
    <SearchBarContext.Provider
      value={{
        menuRef, // for useSearch hook
        open,
        setOpen,
        // for useSearch hook
        item,
        setItem,
        items,
        setItems,
        loading,
        setLoading,
        isSpecSearch,
        setIsSpecSearch,
        searchBarLeftIco,
        setSearchBarLeftIco,
        searchMode,
        setSearchMode,
        tagQueries,
        setTagQueries,
        specificQuery,
        setSpecificQuery,
        searchPerformed,
        setSearchPerformed,
        sort,
        setSort,
        type,
        setType,
        page,
        setPage,
        lastLoadedPage,
        setLastLoadedPage,
        totalPages,
        setTotalPages,
        limit,
        setLimit,
        // SearchBar component
        isDialogOpen,
        setIsDialogOpen,
        selectedFilter,
        setSelectedFilter,
        selectedSort,
        setSelectedSort,
        isClearedFilter,
        setIsClearedFilter,
        isClearedSort,
        setIsClearedSort,
        // SearchBarContext Originals
        handleSearchBar,
        handleSearchBarClose,
        handleSearchBarToggle,
        openSearchBarWithQuery,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
