// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Card, Elevation, Text } from '@blueprintjs/core';
import BlogCard from '../components/blog/BlogCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('/api/posts?page=1');
      if (response.data.length > 0) {
        const visiblePosts = response.data.filter(
          (post) => post.visible !== false
        ); // filter posts to only include visible ones
        visiblePosts.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        ); // sort posts by date in descending order
        setPosts(visiblePosts.slice(0, 2)); // get the two most recent posts
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <div className='hug-left'>
        {/* eslint-disable jsx-a11y/aria-role */}
        <div className='home-logo'>
          <img
            className='home-logo-img'
            src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
            alt='smallbra.in logo'
            role='logo'
          />
          <Text tagName='h1' className='home-logo-text'>
            my.smallbra.in
          </Text>
        </div>
        <Card className='blog-card blog-card-header' elevation={Elevation.ZERO}>
          <Text className='blog-post-card-title'>Latest</Text>
        </Card>
        {posts.map((post, idx) => (
          <BlogCard
            className={
              idx !== posts.length - 1
                ? 'blog-post-card'
                : 'blog-post-card blog-post-card-last'
            }
            date={new Date(post.dateCreated).toLocaleDateString()}
            title={post.title}
            summary={post.summary}
            onClick={() => navigate(`/blog/${post.slug}/${post._id}`)}
          />
        ))}
        <Card
          className='blog-card blog-card-footer'
          elevation={Elevation.ZERO}
          onClick={() => navigate('/blog')}
        >
          <Text className='blog-post-card-title'>... more</Text>
        </Card>
        <div className='card-footer-bottom-space'>&nbsp;</div>
      </div>
    </>
  );
}

export default Home;
