// frontend/src/hooks/useLiveSearch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useLiveSearch = (initialItem) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(initialItem);
  const [items, setItems] = useState([]);
  const [isSpecSearch, setIsSpecSearch] = useState(false);
  const [omnibarLeftIco, setOmnibarLeftIco] = useState('search');
  const [searchMode, setSearchMode] = useState('general');
  const [tagQueries, setTagQueries] = useState([]);
  const [specificQuery, setSpecificQuery] = useState('');
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
  };

  const handleSearchRequest = async (q) => {
    setLoading(true);
    const endpoint = getEndpoint(q);

    try {
      const response = await axios.get(endpoint);
      const mappedItems = response.data.results.map((item_1) => ({
        title: item_1.title ?? '',
        id: item_1._id,
        type: item_1.relatedPosts ? 'blog' : 'portfolio',
        slug: item_1.slug ?? '',
        description: item_1.description ?? '',
        summary: item_1.summary ?? '',
        tags: item_1.tags ?? [],
        category: item_1.category ?? '',
      }));
      setItems(mappedItems);
      setLoading(false);
      return response;
    } catch (error) {
      console.error(error);
      setLoading(false);
      // throw error;
    }
  };

  useEffect(() => {
    const getSearchRequest = async () => {
      if (item) {
        try {
          await handleSearchRequest(item);
          console.log(item);
        } catch (error) {
          console.error(error);
        }
      } else {
        handleSearchReset();
      }
    };
    getSearchRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isSpecSearch]);

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
    },
    handlers: {
      handleSearchReset,
      handleSearchRequest,
    },
  };
};
