// frontend/src/hooks/useSearch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useSearch = (initialItem) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(initialItem);
  const [items, setItems] = useState([]);
  const [isSpecSearch, setIsSpecSearch] = useState(false);
  const [omnibarLeftIco, setOmnibarLeftIco] = useState('search');
  const [searchMode, setSearchMode] = useState('general');
  const [tagQueries, setTagQueries] = useState([]);
  const [specificQuery, setSpecificQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [sort, setSort] = useState(null); // 'asc', 'desc', 'newest', 'oldest'
  const [page, setPage] = useState(1); // pagination page number
  const [limit, setLimit] = useState(null); // items per page
  const [type, setType] = useState(null); // 'artifact', 'post'

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
      setIsSpecSearch(true);
      setSpecificQuery(searchQuery);
      setTagQueries(searchPrefix.splitQuery ? searchQuery : []);
      setSearchMode(searchPrefix.searchMode);
    } else {
      setSearchMode('general');
      setOmnibarLeftIco('search');
      setIsSpecSearch(false);
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
      setIsSpecSearch(true);
      setSpecificQuery(searchQuery);
      setTagQueries(searchPrefix.splitQuery ? searchQuery : []);
      setSearchMode(searchPrefix.searchMode);
      endpoint = `/api/search?${searchPrefix.endpointParam}=${searchQuery}`;
    } else {
      setSearchMode('general');
      setOmnibarLeftIco('search');
      setIsSpecSearch(false);
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
    console.log('Endpoint:' + endpoint);

    return endpoint;
  };

  const handleSearchReset = () => {
    setLoading(false);
    setItem('');
    setItems([]);
    setIsSpecSearch(false);
    setOmnibarLeftIco('search');
    setSearchMode('general');
    setTagQueries([]);
    setSpecificQuery('');
    setSearchPerformed(false);
    setSort(null);
    setPage(null);
    setLimit(null);
    setType(null);
  };

  const handleSearchRequest = async () => {
    if (!item.trim()) {
      setLoading(false);
      setItem('');
      setItems([]);
      setSearchPerformed(true);
      return;
    }

    setLoading(true);
    setItems([]);
    const endpoint = getEndpoint(item);

    try {
      const response = await axios.get(endpoint);
      const mappedItems = response.data.results.map((item_1) => ({
        title: item_1.title ?? '',
        dateCreated: item_1.dateCreated ?? null,
        id: item_1._id,
        type: item_1.relatedPosts ? 'blog' : 'portfolio',
        slug: item_1.slug ?? '',
        description: item_1.description ?? '',
        summary: item_1.summary ?? '',
        tags: item_1.tags ?? (searchMode !== 'tag' ? null : []),
        category: item_1.category ?? '',
      }));
      setItems((prevItems) => [...prevItems, ...mappedItems]);
      setLoading(false);
      setSearchPerformed(true);
      return response;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setItems([]); // clear previous search results on error
      setSearchPerformed(true);
    }
  };

  useEffect(() => {
    if (searchPerformed) {
      handleSearchRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, type]);

  useEffect(() => {
    if (page > 1) {
      handleSearchRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
        setSearchMode('general');
        setOmnibarLeftIco('search');
        setIsSpecSearch(false);
      }
    }
    getSearchTypeAndIcon(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

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
      limit,
      setLimit,
      type,
      setType,
    },
    handlers: {
      handleSearchReset,
      handleSearchRequest,
    },
  };
};
