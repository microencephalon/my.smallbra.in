// frontend/src/shared/hooks/useSearch.js
import { uniqBy } from 'lodash';
import { useEffect } from 'react';
import axios from 'axios';
import { throttle } from 'lodash';

import {
  ALL_PREFIXES,
  SEARCH_PREFIXES,
  SEARCH_MODES,
  PREFIX_MAP,
  SEARCHBAR_OPTIONS,
  THROTTLE_TIME,
  SCROLL_THRESHOLD,
} from '../../constants/searchBar';

import { Endpoint } from '../../constants/endpoints';

const apiEndpoint = new Endpoint(process.env.REACT_APP_API_URL);

const useSearch = (initialItem, searchBarContext) => {
  const { SEARCHBAR_RESETS: RESETS } = SEARCHBAR_OPTIONS;
  const {
    menuRef,
    item,
    setItem,
    setItems,
    loading,
    setLoading,
    setIsSpecSearch,
    setSearchBarLeftIco,
    searchMode,
    setSearchMode,
    setTagQueries,
    setSpecificQuery,
    searchPerformed,
    setSearchPerformed,
    sort,
    type,
    page,
    setPage,
    setLastLoadedPage,
    totalPages,
    setTotalPages,
    limit,
    setSort,
    setLimit,
    setType,
  } = searchBarContext;

  const getSearchTypeAndIcon = (item) => {
    const startsWithQuery = Object.entries(PREFIX_MAP).find(([start]) =>
      item.startsWith(start)
    );

    if (startsWithQuery) {
      const [, prefix] = startsWithQuery;
      let query = item.replace(...prefix.replace);

      if (prefix.splitQuery) {
        query = query.split(',').map((tag) => tag.trim());
      }

      setSearchBarLeftIco(prefix.searchBarIcon);
      setIsSpecSearch(true);
      setSpecificQuery(query);
      setTagQueries(prefix.splitQuery ? query : Array.from(RESETS.tagQueries));
      setSearchMode(prefix.searchMode);
    } else {
      setSearchMode(RESETS.searchMode);
      setSearchBarLeftIco(RESETS.searchBarLeftIco);
      setIsSpecSearch(RESETS.isSpecSearch);
    }
  };

  const getEndpoint = (item) => {
    const moreParams = {
      sort,
      page,
      limit,
      type,
    };

    let encodedItem = encodeURIComponent(item);

    const startsWithQuery = Object.entries(PREFIX_MAP).find(([start]) =>
      item.startsWith(start)
    );

    if (startsWithQuery) {
      const [, searchPrefix] = startsWithQuery;
      let searchQuery = item.replace(...searchPrefix.replace);
      let encodedItem = encodeURIComponent(searchQuery);

      if (searchPrefix.splitQuery) {
        searchQuery = searchQuery.split(',').map((tag) => tag.trim());
      }

      setSearchBarLeftIco(searchPrefix.searchBarIcon);
      setIsSpecSearch(!RESETS.isSpecSearch);
      setSpecificQuery(searchQuery);
      setTagQueries(
        searchPrefix.splitQuery ? searchQuery : Array.from(RESETS.tagQueries)
      );
      setSearchMode(searchPrefix.searchMode);

      return apiEndpoint.getSearch(encodedItem, searchPrefix, moreParams);
    } else {
      setSearchMode(RESETS.searchMode);
      setSearchBarLeftIco(RESETS.searchBarLeftIco);
      setIsSpecSearch(RESETS.isSpecSearch);

      return apiEndpoint.getSearch(encodedItem, null, moreParams);
    }
  };

  const handleSearchReset = () => {
    setLoading(RESETS.loading);
    setItem(RESETS.item);
    setItems(Array.from(RESETS.items));
    setIsSpecSearch(RESETS.isSpecSearch);
    setSearchBarLeftIco(RESETS.searchBarLeftIco);
    setSearchMode(RESETS.searchMode);
    setTagQueries(Array.from(RESETS.tagQueries));
    setSpecificQuery(RESETS.specificQuery);
    setSearchPerformed(RESETS.searchPerformed);
    setSort(RESETS.sort);
    setType(RESETS.type);
    setPage(RESETS.page);
    setLastLoadedPage(RESETS.lastLoadedPage);
    setTotalPages(RESETS.totalPages);
    setLimit(RESETS.limit);
  };

  const handleSearchRequest = async (endpoint = null, resetItems = false) => {
    if (!endpoint) {
      if (!item.trim()) {
        setLoading(RESETS.loading);
        setItem(RESETS.item);

        if (resetItems) {
          // condition to disable resetting
          setItems(Array.from(RESETS.items));
        }
        setSearchPerformed(!RESETS.searchPerformed);
        return;
      }

      setLoading(!RESETS.loading);
      if (resetItems) {
        // condition to disable resetting
        setItems(Array.from(RESETS.items));
      }
      endpoint = getEndpoint(item);
    }

    try {
      const response = await axios.get(endpoint);
      const mappedItems = response.data.results.map((item_1) => ({
        title: item_1.title ?? '',
        dateCreated: item_1.dateCreated ?? null,
        refId: item_1.refId,
        itemType: item_1.itemType,
        slug: item_1.slug ?? '',
        description: item_1.description ?? '',
        summary: item_1.summary ?? '',
        tags: item_1.tags ?? (searchMode !== SEARCH_MODES.tag ? null : []),
        category: item_1.category ?? '',
        pageNum: response.data.page,
      }));
      setTotalPages(response.data.totalPages);

      setItems((prevItems) => {
        const combinedItems = [...prevItems, ...mappedItems];
        const uniqueItems = uniqBy(combinedItems, 'refId');
        return uniqueItems;
      });

      setLoading(RESETS.loading);
      setSearchPerformed(!RESETS.searchPerformed);
      return response;
    } catch (error) {
      console.error(error);
      setLoading(RESETS.loading);
      setItems(Array.from(RESETS.items));
      setSearchPerformed(!RESETS.searchPerformed);
    }
  };

  // DESC: useEffect for sort and type changes
  useEffect(() => {
    if (searchPerformed) {
      setPage(RESETS.page);
      handleSearchRequest(null, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, type]);

  // DESC: When page changes, execute search request to fetch more results
  useEffect(() => {
    if (page >= 1 && searchPerformed) {
      handleSearchRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // DESC: Change left icon with text prefixes in search input bar
  useEffect(() => {
    if (item.trim() === '' || !item.startsWith(SEARCH_PREFIXES.tag[0])) {
      setTagQueries(Array.from(RESETS.tagQueries));
      if (
        !ALL_PREFIXES.filter((str) => str !== SEARCH_PREFIXES.tag[0]).some(
          (prefix) => item.startsWith(prefix)
        )
      ) {
        setSearchMode(RESETS.searchMode);
        setSearchBarLeftIco(RESETS.searchBarLeftIco);
        setIsSpecSearch(RESETS.isSpecSearch);
      }
    }
    getSearchTypeAndIcon(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // DESC: Infinite scroll useEffect
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (menuRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
        const isNearBottom =
          scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD; // 10px threshold

        if (isNearBottom && !loading && page < totalPages) {
          setPage(page + 1);
          setLastLoadedPage(page - 1);
        }
      }
    }, THROTTLE_TIME); // The function won't be called more than once every 750ms

    const currentMenuRef = menuRef.current;

    // Attach the throttled scroll handler
    if (currentMenuRef) {
      currentMenuRef.addEventListener('scroll', handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (currentMenuRef) {
        currentMenuRef.removeEventListener('scroll', handleScroll);
      }

      handleScroll.cancel(); // Cancel any pending executions of the throttled function
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages, loading, menuRef]);

  return {
    handleSearchReset,
    handleSearchRequest,
    initialItem,
  };
};

export default useSearch;
