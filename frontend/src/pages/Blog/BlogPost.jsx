// frontend/src/pages/Blog/Post.jsx

import React from 'react';
import BlogContent from '../../components/blog/BlogPostContent';
import '../../components/blog/blog.css';
import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// TODO: Sort out where the image are being sourced from -- Cloudinary
// TODO: Need to implement the GSAP Scroll Trigger for the Menu.
// https://webflow.com/made-in-webflow/website/Freebie-Dynamic-collection-with-anchor-link-scrollbar
// https://webflow.com/made-in-webflow/website/vertical-navbar
// TODO: Use MongoDB as the database for the blog posts.
// TODO: Add the Cloudinary upload widget // https://cloudinary.com/documentation/upload_widget for create new blog post and editing mode
// TODO: Take in slug and/or ID to generate content. Look at Listing.jsx from house-marketplace project for API to fetch data.

export const ThemeContext = createContext();

function BlogPost() {
  const [isDark, setIsDark] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const value = {
    isDark,
    setIsDark,
  };

  const { id: idFromParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/posts/${idFromParams}`
        );
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

  if (isFetching && !isNotFound) {
    return <div>Loading...</div>;
  }

  if (isNotFound) {
    return <div>404 Not Found</div>;
  }

  return (
    <div
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 60,
        paddingBottom: 30,
      }}
    >
      <ThemeContext.Provider value={value}>
        <div className='blog-post'>
          {/* Table of Contents Sidebar */}
          {/* <BlogTableOfContents /> */}
          <BlogContent />
          {/* More Articles */}
          {/* <BlogMoreArticles /> */}
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default BlogPost;
