// frontend/src/pages/Resume.jsx
// Location of current resume: https://localhost:8081/storage/resume/2023-05-17-dana-tolman-resume.md

// frontend/src/pages/Blog/Post.jsx

import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function About() {
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

  if (isFetching && !isNotFound) {
    return <div>Loading...</div>;
  }

  if (isNotFound) {
    return <div>404 Not Found</div>;
  }

  return (
    <>
      <ThemeContext.Provider value={value}>
        <div className='mysb-about'>
          <br />
          <br />
          <br />
          <br />
          About: hello my name is Dana
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default About;
