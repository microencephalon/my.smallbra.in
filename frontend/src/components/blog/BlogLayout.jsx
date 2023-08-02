// frontend/src/components/AdminLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogroll from '../../pages/Blog/Blogroll';
import BlogPost from '../../pages/Blog/BlogPost';
import Error from '../../pages/Error';

const BlogLayout = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Blogroll />} />
        <Route path='/:slug/:id' element={<BlogPost />} />
        <Route path='*' element={<Error responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default BlogLayout;
