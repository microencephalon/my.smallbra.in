// frontend/src/pages/Blog/Blogroll.jsx
// import '../../assets/css/blog.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Elevation,
  Text,
  Button,
  Icon,
  // Position,
  // Popover,
} from '@blueprintjs/core';
import BlogCard from '../../components/blog/BlogCard';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Blogroll = () => {
  const fadeInRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getInitialPosts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/posts?page=1`);
      const { posts, pages } = response.data;

      const visiblePosts = posts
        .filter((post) => post.visible !== false)
        .map((post) => ({ data: post, isLoading: true }));
      visiblePosts.sort(
        (a, b) => new Date(b.data.dateCreated) - new Date(a.data.dateCreated)
      );

      setPosts(visiblePosts);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching initial posts:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setPosts((prevPosts) =>
          prevPosts.map((postObj) => ({ ...postObj, isLoading: false }))
        );
      }, 250);
    }
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (loading || page >= totalPages) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(`/api/posts?page=${nextPage}`);
      const { posts: newPosts } = response.data;

      const visiblePosts = newPosts.map((post) => ({
        data: post,
        isLoading: true,
      }));
      setPosts((prevPosts) => [...prevPosts, ...visiblePosts]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setPosts((prevPosts) =>
          prevPosts.map((postObj) => ({ ...postObj, isLoading: false }))
        );
      }, 500);
    }
  }, [loading, page, totalPages]);

  const renderCard = (postObj, idx) => (
    <div
      style={{ display: 'flex', flexDirection: 'row', paddingBottom: '5px' }}
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
        summary={postObj.data.summary}
        onClick={() =>
          navigate(`/blog/${postObj.data.slug}/${postObj.data._id}`)
        }
      ></BlogCard>
    </div>
  );

  const handleLoadMore = () => {
    loadMorePosts();
    if (fadeInRef.current) {
      clearTimeout(fadeInRef.current); // Clear any existing timeout
    }
    fadeInRef.current = setTimeout(() => {
      setPosts((prevPosts) =>
        prevPosts.map((postObj) => ({ ...postObj, isLoading: false }))
      );
    }, 500); // Set a timeout to remove the skeleton class and add the fade-in class
  };

  useEffect(() => {
    getInitialPosts();
  }, [getInitialPosts]);

  useEffect(() => {
    if (fadeInRef.current) {
      clearTimeout(fadeInRef.current); // Clear any existing timeout when the component unmounts
    }
  }, []);

  return (
    <div style={{ paddingTop: '60px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: 332,
        }}
      >
        <Card className='blog-card blog-card-header' elevation={Elevation.ZERO}>
          <Text className='blog-post-card-title'>Articles</Text>
        </Card>
        {posts.map((post, idx) => (
          <React.Fragment key={post._id}>
            {renderCard(post, idx)}
          </React.Fragment>
        ))}
        {page < totalPages && (
          <Button
            className='load-more-button'
            minimal={true}
            large={true}
            onClick={handleLoadMore}
            icon={
              <Icon
                icon='caret-down'
                size='1.5em'
                color='#141414'
                large={true}
              />
            }
            disabled={loading}
          />
        )}
      </div>
      <div className='card-footer-bottom-space'>&nbsp;</div>
    </div>
  );
};

export default Blogroll;
