// frontend/src/pages/Blog/Blogroll.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';

axios.defaults.baseURL = 'http://localhost:4500';

const Blogroll = () => {
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreRef = useRef();

  const getPosts = useCallback(async () => {
    const response = await axios.get(`/api/posts?page=${page}`);
    if (response.data.length > 0) {
      const visiblePosts = response.data.filter(
        (post) => post.visible !== false
      ); // filter posts to only include visible ones
      setPosts((prevPosts) => {
        const lastPost = prevPosts[prevPosts.length - 1];
        const lastNewPost = visiblePosts[visiblePosts.length - 1];
        if (lastPost && lastNewPost && lastPost.id === lastNewPost.id) {
          setHasMorePosts(false);
          return prevPosts;
        }
        return [...prevPosts, ...visiblePosts];
      });
    } else {
      setHasMorePosts(false);
    }
  }, [page]); // getPosts is now dependent on the page state

  useEffect(() => {
    if (hasMorePosts) {
      getPosts();
    }
  }, [page, getPosts, hasMorePosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true && hasMorePosts) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, [loadMoreRef, hasMorePosts]);

  const renderShortCard = (post) => (
    <Link to={`/blog/${post.slug}/${post._id}`}>
      <Card key={post._id} style={{ width: '16rem' }}>
        {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <br />
          <Card.Subtitle className='mb-2 text-muted'>
            {post.author}
          </Card.Subtitle>
          <Card.Text>{post.category}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );

  const renderWideCard = (post, idx) => (
    <Link to={`/blog/${post.slug}/${post._id}`}>
      <Card key={post._id} style={{ height: '6rem', width: '48rem' }}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>&nbsp;&nbsp;
          <Card.Subtitle className='mb-2 text-muted'>
            {post.author}
          </Card.Subtitle>
          <Card.Text>{post.category}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );

  return (
    <div>
      <img
        src='http://localhost:8081/storage/images/smallbrain-logo3.png'
        alt='Logo of smallbra.in'
      />
      <br />
      <Row xs='auto' sm='auto' md='auto'>
        {posts.slice(0, 3).map((post, idx) => renderShortCard(post, idx))}
      </Row>
      <Row xs='auto' sm='auto' md='auto'>
        {posts.slice(3).map((post, idx) => renderWideCard(post, idx + 3))}
      </Row>
      {hasMorePosts && <div ref={loadMoreRef}>Load More...</div>}
    </div>
  );
};

export default Blogroll;
