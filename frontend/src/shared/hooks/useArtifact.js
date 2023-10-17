// frontend/src/shared/hooks/useArtifact.js
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useArtifact = (idFromParams) => {
  const [artifact, setArtifact] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabId, setTabId] = useState(''); // Added setTabId here
  const [responseCode, setResponseCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/artifacts/${idFromParams}`);
        if (response.status === 200) {
          setIsFetching(false);
          if (response.data.media.length > 0) {
            setTabId('media-0');
          }
        } else {
          setIsNotFound(true);
        }
        setArtifact(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setResponseCode(String(error.response.status));
        } else {
          setIsNotFound(true);
        }
        console.error(error.message);
      }
    };

    fetchData();
  }, [idFromParams, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    artifact,
    isFetching,
    isNotFound,
    loading,
    tabId,
    setTabId,
    responseCode,
  }; // Included tabId and setTabId in the return object
};

export default useArtifact;
