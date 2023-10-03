// frontend/src/hooks/useSearch.js
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { throttle as _throttle } from 'lodash';
import { OmnibarContext } from '../store/contexts/OmnibarContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useSearch = (initialItem) => {
  const resets = {
    loading: false,
    item: '',
    isSpecSearch: false,
    searchMode: 'general',
    omnibarLeftIco: 'search',
    specificQuery: '',
    searchPerformed: false,
    sort: null,
    type: null,
    page: 1,
    lastLoadedPage: 0,
    totalPages: null,
    limit: 20,
  };

  const {
    menuRef,
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
  } = useContext(OmnibarContext);

  const searchPrefixMap = {
    'tag:': {
      replace: ['tag:', ''],
      omnibarIcon: 'tag',
      searchMode: 'tag',
      endpointParam: 'tags',
      splitQuery: true,
    },
    'title:': {
      replace: ['title:', ''],
      omnibarIcon: 'header-one',
      searchMode: 'title',
      endpointParam: 'title',
    },
    't:': {
      replace: ['t:', ''],
      omnibarIcon: 'header-one',
      searchMode: 'title',
      endpointParam: 'title',
    },
    'category:': {
      replace: ['category:', ''],
      omnibarIcon: 'intersection',
      searchMode: 'category',
      endpointParam: 'category',
    },
    'cat:': {
      replace: ['cat:', ''],
      omnibarIcon: 'intersection',
      searchMode: 'category',
      endpointParam: 'category',
    },
    'summary:': {
      replace: ['summary:', ''],
      omnibarIcon: 'search-template',
      searchMode: 'summary',
      endpointParam: 'summary',
    },
    'sum:': {
      replace: ['sum:', ''],
      omnibarIcon: 'search-template',
      searchMode: 'summary',
      endpointParam: 'summary',
    },
    'description:': {
      replace: ['description:', ''],
      omnibarIcon: 'search-template',
      searchMode: 'description',
      endpointParam: 'description',
    },
    'desc:': {
      replace: ['desc:', ''],
      omnibarIcon: 'search-template',
      searchMode: 'description',
      endpointParam: 'description',
    },
  };

  const getSearchTypeAndIcon = (item) => {
    const startsWithQuery = Object.entries(searchPrefixMap).find(([start]) =>
      item.startsWith(start)
    );

    if (startsWithQuery) {
      const [, searchPrefix] = startsWithQuery;
      let searchQuery = item.replace(...searchPrefix.replace);

      if (searchPrefix.splitQuery) {
        searchQuery = searchQuery.split(',').map((tag) => tag.trim());
      }

      setOmnibarLeftIco(searchPrefix.omnibarIcon);
      setIsSpecSearch(!resets.isSpecSearch);
      setSpecificQuery(searchQuery);
      setTagQueries(searchPrefix.splitQuery ? searchQuery : []);
      setSearchMode(searchPrefix.searchMode);
    } else {
      setSearchMode(resets.searchMode);
      setOmnibarLeftIco(resets.omnibarLeftIco);
      setIsSpecSearch(resets.isSpecSearch);
    }
  };

  const getEndpoint = (item) => {
    let endpoint;

    const startsWithQuery = Object.entries(searchPrefixMap).find(([start]) =>
      item.startsWith(start)
    );

    if (startsWithQuery) {
      const [, searchPrefix] = startsWithQuery;
      let searchQuery = item.replace(...searchPrefix.replace);

      if (searchPrefix.splitQuery) {
        searchQuery = searchQuery.split(',').map((tag) => tag.trim());
      }

      setOmnibarLeftIco(searchPrefix.omnibarIcon);
      setIsSpecSearch(!resets.isSpecSearch);
      setSpecificQuery(searchQuery);
      setTagQueries(searchPrefix.splitQuery ? searchQuery : []);
      setSearchMode(searchPrefix.searchMode);
      endpoint = `/api/search?${searchPrefix.endpointParam}=${searchQuery}`;
    } else {
      setSearchMode(resets.searchMode);
      setOmnibarLeftIco(resets.omnibarLeftIco);
      setIsSpecSearch(resets.isSpecSearch);
      endpoint = `/api/search?query=${item}`;
    }

    const newParams = [];
    if (sort) newParams.push(`sort=${sort}`);
    if (page) newParams.push(`page=${page}`);
    if (limit) newParams.push(`limit=${limit}`);
    if (type) newParams.push(`type=${type}`);
    if (newParams.length > 0) {
      endpoint += `&${newParams.join('&')}`;
    }
    console.debug('Endpoint:' + endpoint);

    return endpoint;
  };

  const handleSearchReset = () => {
    setLoading(resets.loading);
    setItem(resets.item);
    setItems([]);
    setIsSpecSearch(resets.isSpecSearch);
    setOmnibarLeftIco(resets.omnibarLeftIco);
    setSearchMode(resets.searchMode);
    setTagQueries([]);
    setSpecificQuery(resets.specificQuery);
    setSearchPerformed(resets.searchPerformed);
    setSort(resets.sort);
    setPage(resets.page);
    setLastLoadedPage(resets.lastLoadedPage);
    setLimit(resets.limit);
    setType(resets.type);
  };

  const handleSearchRequest = async (endpoint) => {
    if (!endpoint) {
      if (!item.trim()) {
        setLoading(resets.loading);
        setItem(resets.item);

        if (page === 1) {
          // condition to disable resetting
          setItems([]);
        }
        setSearchPerformed(!resets.searchPerformed);
        return;
      }

      setLoading(!resets.loading);
      if (page === 1) {
        // condition to disable resetting
        setItems([]);
      }

      endpoint = getEndpoint(item);
    }

    try {
      const response = await axios.get(endpoint);
      setTotalPages(response.data.totalPages);
      const mappedItems = response.data.results.map((item_1) => ({
        title: item_1.title ?? '',
        dateCreated: item_1.dateCreated ?? null,
        refId: item_1.refId,
        itemType: item_1.itemType,
        slug: item_1.slug ?? '',
        description: item_1.description ?? '',
        summary: item_1.summary ?? '',
        tags: item_1.tags ?? (searchMode !== 'tag' ? null : []),
        category: item_1.category ?? '',
        pageNum: response.data.page,
      }));
      setItems((prevItems) => [...prevItems, ...mappedItems]);
      setLoading(resets.loading);
      setSearchPerformed(!resets.searchPerformed);
      return response;
    } catch (error) {
      console.error(error);
      setLoading(resets.loading);
      setItems([]);
      setSearchPerformed(!resets.searchPerformed);
    }
  };

  useEffect(() => {
    if (searchPerformed) {
      handleSearchRequest();
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
    if (item.trim() === '' || !item.startsWith('tag:')) {
      setTagQueries([]);
      const prefixes = [
        'title:',
        't:',
        'category:',
        'cat:',
        'summary:',
        'sum:',
        'description:',
        'desc:',
      ];
      if (!prefixes.some((prefix) => item.startsWith(prefix))) {
        setSearchMode(resets.searchMode);
        setOmnibarLeftIco(resets.omnibarLeftIco);
        setIsSpecSearch(resets.isSpecSearch);
      }
    }
    getSearchTypeAndIcon(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    // DESC: for infinite scrolling for search results
    const handleScroll = _throttle(() => {
      if (menuRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

        if (isNearBottom && !loading && page < totalPages) {
          console.debug('Near bottom, loading more results...');
          setPage(page + 1);
          setLastLoadedPage(page - 1);
        }
      }
    }, 750); // The function won't be called more than once every 750ms

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
    states: {
      loading,
      setLoading,
      item,
      setItem,
      items,
      setItems,
      isSpecSearch,
      setIsSpecSearch,
      omnibarLeftIco,
      setOmnibarLeftIco,
      searchMode,
      setSearchMode,
      tagQueries,
      setTagQueries,
      specQ: specificQuery,
      setSpecQ: setSpecificQuery,
      searchPerformed,
      setSearchPerformed,
      sort,
      setSort,
      page,
      setPage,
      lastLoadedPage,
      setLastLoadedPage,
      totalPages,
      setTotalPages,
      limit,
      setLimit,
      type,
      setType,
    },
    handlers: {
      handleSearchReset,
      handleSearchRequest,
    },
    refs: {
      menuRef,
    },
    resets,
    initialItem,
  };
};
