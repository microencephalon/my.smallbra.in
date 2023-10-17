// frontend/src/shared/hooks/useResumeContent.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const storageBaseUrl = 'http://localhost:8081';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useResumeContent = (idFromParams) => {
  const [resumeContent, setResumeContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/resumes/current`);
        const resume = response.data;
        const mdFileURL = `${storageBaseUrl}${resume.content}`;

        const mdResponse = await axios.get(mdFileURL);
        const mdContent = mdResponse.data;

        const highlightedMdContent = mdContent.replace(
          /==([^=]+)==/g,
          '<span style="background-color: #FFECB1;">$1</span>'
        );
        setResumeContent(highlightedMdContent);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idFromParams]);

  return { resumeContent, loading };
};

export default useResumeContent;
