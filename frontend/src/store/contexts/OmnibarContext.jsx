// frontend/src/contexts/OmnibarContext.jsx
import { createContext, useState, useRef, useContext } from 'react';
import { useSearch } from '../../hooks/useSearch'; // Adjusted the path based on the structure you’ve provided.
import OMNIBAR_OPTIONS from '../../store/options/omnibarOptions';
import { omnibar as omnibarElements } from '../../store/elements/global';
import { waitForElement } from '../../helpers/dom';
import { GlobalContext } from './GlobalContext';

// Initialize the context with default values
export const OmnibarContext = createContext({
  menuRef: () => {},
  open: false,
  setOpen: () => {},
  item: '',
  setItem: () => {},
  items: [],
  setItems: () => {},
  loading: false,
  setLoading: () => {},
  isSpecSearch: false,
  setIsSpecSearch: () => {},
  omnibarLeftIco: 'search',
  setOmnibarLeftIco: () => {},
  searchMode: 'general',
  setSearchMode: () => {},
  tagQueries: [],
  setTagQueries: () => {},
  searchPerformed: false,
  setSearchPerformed: () => {},
  sort: null,
  setSort: () => {},
  type: null,
  setType: () => {},
  page: 1,
  setPage: () => {},
  lastLoadedPage: 0,
  setLastLoadedPage: () => {},
  totalPages: null,
  setTotalPages: () => {},
  limit: 20,
  setLimit: () => {},
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  selectedFilter: {},
  setSelectedFilter: () => {},
  selectedSort: {},
  setSelectedSort: () => {},
  isClearedFilter: true,
  setIsClearedFilter: () => {},
  isClearedSort: true,
  setIsClearedSort: () => {},
  handleOmnibar: () => {},
  handleOmnibarClose: () => {},
  handleOmnibarToggle: () => {},
  openOmnibarWithQuery: async () => {},
});

export const OmnibarProvider = ({ children }) => {
  const { setBlur } = useContext(GlobalContext);
  const { resets, initialItem } = useSearch('');
  const { omnibarResets } = OMNIBAR_OPTIONS;

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  // Migrated from useSearch
  const [item, setItem] = useState(initialItem);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(resets.loading);
  const [isSpecSearch, setIsSpecSearch] = useState(resets.isSpecSearch);
  const [omnibarLeftIco, setOmnibarLeftIco] = useState(resets.omnibarLeftIco);
  const [searchMode, setSearchMode] = useState(resets.searchMode);
  const [tagQueries, setTagQueries] = useState([]);
  const [specificQuery, setSpecificQuery] = useState(resets.specificQuery);
  const [searchPerformed, setSearchPerformed] = useState(
    resets.searchPerformed
  );
  const [sort, setSort] = useState(resets.sort);
  const [type, setType] = useState(resets.type);
  const [page, setPage] = useState(resets.page);
  const [lastLoadedPage, setLastLoadedPage] = useState(resets.lastLoadedPage);
  const [totalPages, setTotalPages] = useState(resets.totalPages);
  const [limit, setLimit] = useState(resets.limit);

  // Migrated from SBOmnibar component
  const [isDialogOpen, setIsDialogOpen] = useState(omnibarResets.isDialogOpen);
  const [selectedFilter, setSelectedFilter] = useState(
    omnibarResets.selectedFilter
  );
  const [selectedSort, setSelectedSort] = useState(omnibarResets.selectedSort); // Set default sort option
  const [isClearedFilter, setIsClearedFilter] = useState(
    omnibarResets.isClearedFilter
  );
  const [isClearedSort, setIsClearedSort] = useState(
    omnibarResets.isClearedSort
  );

  const handleOmnibar = () => setOpen((prevOpen) => !prevOpen);

  let scrollLockTimeout;
  let scrollPosition;

  // Function to lock the scroll position
  const lockScroll = () => {
    window.scrollTo(0, scrollPosition);
  };

  const handleOmnibarClose = () => {
    setBlur(false);
    setOpen(false); // Assuming setOpen sets the state for Omnibar's open/close

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

  const handleOmnibarToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setBlur(true);
  };

  const openOmnibarWithQuery = async (query, timeout = 5000) => {
    try {
      handleOmnibarToggle(); // Open the Omnibar

      // Wait for the input element to appear in the DOM
      const inputElement = await waitForElement(
        omnibarElements.inputField,
        timeout
      );
      inputElement.value = query;
      setItem(query);

      // Wait for the button to appear in the DOM
      const submitSearchBtn = await waitForElement(
        omnibarElements.buttons.submitQuery,
        timeout
      );
      submitSearchBtn.click();
    } catch (error) {
      console.error(error.message); // Log the error message
    }
  };

  return (
    <OmnibarContext.Provider
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
        omnibarLeftIco,
        setOmnibarLeftIco,
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
        // SBOmnibar component
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
        // OmnibarContext Originals
        handleOmnibar,
        handleOmnibarClose,
        handleOmnibarToggle,
        openOmnibarWithQuery,
      }}
    >
      {children}
    </OmnibarContext.Provider>
  );
};
