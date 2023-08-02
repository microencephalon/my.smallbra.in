// frontend/src/pages/Blog/Blogroll.jsx
// import '../../assets/css/blog.css';
import React, { useState, useEffect, useCallback } from 'react';
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
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getInitialPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/pg?page=1`);
      const { posts: newPosts, pages: totalPages } = response.data;

      const visiblePosts = newPosts.filter((post) => post.visible !== false);
      visiblePosts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );

      setPosts(visiblePosts);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching initial posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (loading || page >= totalPages) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(`/api/posts/pg?page=${nextPage}`);
      const { posts: newPosts } = response.data;

      const visiblePosts = newPosts.filter((post) => post.visible !== false);
      visiblePosts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );

      setPosts((prevPosts) => [...prevPosts, ...visiblePosts]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, totalPages]);

  useEffect(() => {
    getInitialPosts();
  }, [getInitialPosts]);

  const renderCard = (post, idx) => (
    <div style={{ display: 'flex', flexDirection: 'row' }} key={post._id}>
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
      ></BlogCard>
    </div>
  );

  const handleLoadMore = () => {
    loadMorePosts();
  };

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
