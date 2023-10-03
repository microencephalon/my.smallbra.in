// frontend/src/components/AdminLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogroll from '../../pages/Blog/Blogroll';
import BlogPost from '../../pages/Blog/BlogPost';
import ErrorCard from '../global/ErrorCard';

const BlogLayout = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Blogroll />} />
        <Route path='/:slug/:id' element={<BlogPost />} />
        <Route path='*' element={<ErrorCard responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default BlogLayout;
