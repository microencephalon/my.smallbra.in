// frontend/src/pages/Blog/Edit.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// TODO: 500 error when trying to modify the file on the NGINX server. Just get Node to modify the local files on the system instead of trying to have it interface with NGINX.

axios.defaults.baseURL = 'http://localhost:4500';

const Edit = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/${post.content}?v=${Date.now()}` // add versioning to avoid not caching when an update occurs
        );
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        console.log(`http://localhost:8081/${post.content}`);
        console.error('Error fetching markdown file:' + err);
      }
    };

    if (post) {
      fetchMarkdown();
    }
  }, [post]);

  const handleMarkdownUpdate = async () => {
    try {
      const response = await axios.post(
        `/api/posts/update-post/${id}`,
        { markdown: markdown },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Server response:', response);

      if (response.status === 200) {
        // You may want to provide some user feedback here, like a success message.
      }
    } catch (err) {
      console.error('Error updating markdown:', err);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <p>
        <strong>Title:</strong> {post.title}
      </p>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Visible:</strong> {post.visible ? 'True' : 'False'}
      </p>
      <p>
        <strong>Slug:</strong> {post.slug}
      </p>
      <p>
        <strong>Date Created:</strong>{' '}
        {new Date(post.dateCreated).toLocaleDateString()}
      </p>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <br />
      <button onClick={handleMarkdownUpdate}>Save</button>
    </div>
  );
};

export default Edit;
