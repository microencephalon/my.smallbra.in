// frontend/src/shared/hooks/useBlogPost.js
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useBlogPost = (idFromParams) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/posts/${idFromParams}`);
        if (response.status === 200) {
          setIsFetching(false);
        } else {
          setIsNotFound(true);
        }
      } catch (error) {
        setIsNotFound(true);
        console.error(error.message);
      }
    };

    fetchData();
  }, [idFromParams]);

  // To stop it from scrolling to bottom when navigating by way of SearchBar
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { isFetching, isNotFound };
};

export default useBlogPost;
