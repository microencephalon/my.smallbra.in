// frontend/src/pages/Blog/Post.jsx

import React from 'react';
// TODO: Fix BlogTableOfContents
// import BlogTableOfContents from '../components/blog/BlogTableOfContents';
// import MoreArticles from '../../components/blog/MoreArticles';
import { useParams } from 'react-router-dom';
import BlogContent from '../../components/blog/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/blog.css';

import { useState, createContext } from 'react';

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

  const { id } = useParams();

  const value = {
    isDark,
    setIsDark,
  };

  return (
    <>
      <ThemeContext.Provider value={value}>
        <div className='blog-post'>
          {/* Table of Contents Sidebar */}
          {/* <BlogTableOfContents /> */}
          {/* Blog Content */}
          <BlogContent postId={id} />
          {/* More Articles */}
          {/* <BlogMoreArticles /> */}
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default BlogPost;
