// frontend/src/pages/Admin/BlogEdit.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FormGroup,
  InputGroup,
  Button,
  TextArea,
  OverlayToaster,
  Position,
  Intent,
  Switch,
} from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const Edit = ({ id, onUpdate }) => {
  const [post, setPost] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

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
  }, [id, refreshCount]);

  const handlePostUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      AppToaster.show({
        message: 'Update successful!',
        isCloseButtonShown: false,
        intent: Intent.SUCCESS,
        timeout: 2500,
      });
      setRefreshCount(refreshCount + 1);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      AppToaster.show({
        message: 'Error updating post!',
        isCloseButtonShown: false,
        intent: Intent.DANGER,
        timeout: 2500,
      });
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <FormGroup label='Title:' labelFor='title' style={{ width: '50%' }}>
        <InputGroup
          id='title'
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </FormGroup>
      <FormGroup label='Summary:' labelFor='summary' style={{ width: '50%' }}>
        <TextArea
          id='summary'
          value={post.summary}
          onChange={(e) => setPost({ ...post, summary: e.target.value })}
        />
      </FormGroup>

      <FormGroup label='Author:' labelFor='author' style={{ width: '50%' }}>
        <InputGroup
          id='author'
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />
      </FormGroup>

      <FormGroup label='Category:' labelFor='category' style={{ width: '50%' }}>
        <InputGroup
          id='category'
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
        />
      </FormGroup>

      <FormGroup label='Visible:' labelFor='visible' style={{ width: '50%' }}>
        <Switch
          id='visible'
          label={post.visible ? 'True' : 'False'}
          checked={post.visible}
          onChange={(e) => setPost({ ...post, visible: e.target.checked })}
        />
      </FormGroup>

      <FormGroup label='Slug:' labelFor='slug' style={{ width: '50%' }}>
        <InputGroup id='slug' disabled='true' value={post.slug} />
      </FormGroup>

      <FormGroup
        label='Date Created:'
        labelFor='dateCreated'
        style={{ width: '50%' }}
      >
        <InputGroup
          id='dateCreated'
          disabled='true'
          value={new Date(post.dateCreated).toLocaleDateString()}
        />
      </FormGroup>
      <FormGroup>
        <Link to={`/admin/blog/${id}`} style={{ textDecoration: 'none' }}>
          <Button
            icon='edit'
            text='Edit Markdown File'
            outlined={true}
            intent={Intent.PRIMARY}
          />
        </Link>
      </FormGroup>

      <Button onClick={handlePostUpdate}>Save</Button>
    </div>
  );
};

export default Edit;
