// frontend/src/features/Public/Resume/pages/Resume.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Spinner, SpinnerSize } from '@blueprintjs/core';

import Content from '../components/Content';
import Global from '../../../../shared/components/global';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Resume() {
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

  if (isNotFound) {
    return <Global.ErrorCard responseCode={'404'} />;
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
      <div className='blog-post'>
        <Content />
      </div>
    </>
  );
}

export default Resume;
