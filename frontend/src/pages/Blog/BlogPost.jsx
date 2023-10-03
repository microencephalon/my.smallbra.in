// frontend/src/pages/Blog/Post.jsx

import React from 'react';
import BlogContent from '../../components/blog/BlogPostContent';
import '../../components/blog/blog.css';
import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner, SpinnerSize } from '@blueprintjs/core';
import ErrorCard from '../../components/global/ErrorCard';

export const ThemeContext = createContext();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function BlogPost() {
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const { id: idFromParams } = useParams();

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

  // To stop it from scrolling to bottom when navigating by way of Omnibar.
  useEffect(() => {
    // Delay of 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    // Cleanup timer if the component is unmounted before the timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isFetching && !isNotFound) {
    return (
      <div className='portfolio-artifact'>
        <Spinner size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  }

  if (isNotFound) {
    return <ErrorCard responseCode={'404'} />;
  }

  return (
    <div className='blog-post-container'>
      <div className='blog-post'>
        {/* Table of Contents Sidebar */}
        {/* <BlogTableOfContents /> */}
        <BlogContent />
        {/* More Articles */}
        {/* <BlogMoreArticles /> */}
      </div>
    </div>
  );
}

export default BlogPost;
