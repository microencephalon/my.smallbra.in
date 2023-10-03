// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Card, Elevation, Text } from '@blueprintjs/core';

import BlogCard from '../components/blog/BlogCard';
import HomeLogo from '../components/common/HomeLogo';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('/api/posts?home');
        const { posts: newPosts } = response.data;
        if (newPosts.length > 0) {
          const visiblePosts = newPosts
            .filter((post) => post.visible !== false)
            .map((post) => ({ data: post, isLoading: true }));
          visiblePosts.sort(
            (a, b) =>
              new Date(b.data.dateCreated) - new Date(a.data.dateCreated)
          );
          setPosts(visiblePosts);
          setTimeout(() => {
            setPosts((prevPosts) =>
              prevPosts.map((postObj) => ({ ...postObj, isLoading: false }))
            );
          }, 250);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <div className='home-container'>
        <HomeLogo />
        <Card className='blog-card blog-card-header' elevation={Elevation.ZERO}>
          <Text id='latest-posts-header' className='blog-post-card-title'>
            Latest
          </Text>
        </Card>
        {posts.map((postObj, idx) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: '5px',
            }}
            key={postObj.data._id}
            className={`${postObj.isLoading ? '' : 'fade-in-card'}`}
          >
            <BlogCard
              className={`
                  ${
                    idx !== posts.length - 1
                      ? 'blog-post-card'
                      : 'blog-post-card blog-post-card-last'
                  }
                  ${postObj.isLoading ? 'bp5-skeleton' : ''}
                `}
              date={new Date(postObj.data.dateCreated).toLocaleDateString()}
              title={postObj.data.title}
              onClick={() =>
                navigate(`/blog/${postObj.data.slug}/${postObj.data._id}`)
              }
            />
          </div>
        ))}
        <div className='card-footer-bottom-space' />
      </div>
    </>
  );
}

export default Home;
