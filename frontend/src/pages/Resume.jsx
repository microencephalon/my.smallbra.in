// frontend/src/pages/Resume.jsx

import React from 'react';
import ResumeContent from '../components/resume/ResumeContent';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Spinner, SpinnerSize } from '@blueprintjs/core';
import ErrorCard from '../components/global/ErrorCard';

export const ThemeContext = createContext();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Resume() {
  const [isDark, setIsDark] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const value = {
    isDark,
    setIsDark,
  };

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

  if (isNotFound) {
    return <ErrorCard responseCode={'404'} />;
  }

  if (isFetching && !isNotFound) {
    return (
      <div className='portfolio-artifact'>
        <Spinner size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  }

  return (
    <>
      <ThemeContext.Provider value={value}>
        <div className='blog-post'>
          <ResumeContent />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default Resume;
