// frontend/src/shared/hooks/useResume.js
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useResume = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/resumes/current`);
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
  }, []);

  return { isFetching, isNotFound };
};

export default useResume;
