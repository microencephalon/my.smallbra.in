// frontend/src/shared/hooks/useRoll.js
import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';

const useRoll = (itemType, initialUrl, loadMoreUrl) => {
  const ROLL_RESETS = {
    items: [],
    page: 1,
    totalPages: 0,
    loading: false,
  };

  const fadeInRef = useRef(null);

  const [items, setItems] = useState(Array.from(ROLL_RESETS.items));
  const [page, setPage] = useState(ROLL_RESETS.page);
  const [totalPages, setTotalPages] = useState(ROLL_RESETS.totalPages);
  const [loading, setLoading] = useState(ROLL_RESETS.loading);

  const getInitialItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(initialUrl);
      const initialItems = response.data[itemType].map((item) => ({
        ...item,
        isLoading: true,
      }));
      setItems(initialItems);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching initial items:', error);
    } finally {
      setLoading(ROLL_RESETS.loading);
      setTimeout(() => {
        setItems((prevItems) =>
          prevItems.map((prevItem) => ({
            ...prevItem,
            isLoading: false,
          }))
        );
      }, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  const loadMoreItems = useCallback(async () => {
    if (!loadMoreUrl || loading || page >= totalPages) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(loadMoreUrl(nextPage));
      const newItems = response.data[itemType].map((item) => ({
        ...item,
        isLoading: true,
      }));
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setLoading(ROLL_RESETS.loading);
      setTimeout(() => {
        setItems((prevItems) =>
          prevItems.map((prevItem) => ({
            ...prevItem,
            isLoading: false,
          }))
        );
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page, totalPages, loadMoreUrl]);

  const handleLoadMore = useCallback(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  useEffect(() => {
    getInitialItems();
  }, [getInitialItems]);

  useEffect(() => {
    if (fadeInRef.current) {
      clearTimeout(fadeInRef.current);
    }
  }, []);

  return {
    items,
    loading,
    handleLoadMore,
    totalPages,
    page,
  };
};

export default useRoll;
