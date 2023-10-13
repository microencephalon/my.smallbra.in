// frontend/src/pages/Blog/ViewList.jsx
import '@blueprintjs/table/lib/css/table.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Switch,
  HTMLTable,
  OverlayToaster,
  Position,
  Intent,
  Drawer,
  DrawerSize,
} from '@blueprintjs/core';

import Edit from '../Blog/Edit';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const BlogViewList = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState({}); // change null to {}
  const [editedPost, setEditedPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await axios.get('/api/posts');
    setPosts(response.data);
  };

  const deletePost = async (id) => {
    const userConfirmed = window.confirm('Do you want to delete?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        AppToaster.show({
          message: 'Successfully deleted post!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
        getPosts();
      } catch (error) {
        AppToaster.show({
          message: 'Error deleting post!',
          isCloseButtonShown: false,
          intent: Intent.DANGER,
          timeout: 2500,
        });
        console.error(error);
      }
    }
  };

  const startEditing = (post, field) => {
    setEditing({ id: post._id, field: field });
    setEditedPost(post);
    setOriginalPost(post);
  };

  const stopEditing = () => {
    setEditing({}); // change null to {}
    setEditedPost(null);
    setOriginalPost(null);
  };

  const savePost = async () => {
    const userConfirmed = window.confirm('Do you want to save changes?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`/api/posts/${editedPost._id}`, editedPost, {
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
        stopEditing();
        getPosts();
      } catch (error) {
        AppToaster.show({
          message: 'Error updating post!',
          isCloseButtonShown: false,
          intent: Intent.DANGER,
          timeout: 2500,
        });
        console.error(error);
      }
    }
  };

  const saveIfChanged = async () => {
    if (
      editedPost &&
      originalPost &&
      JSON.stringify(editedPost) !== JSON.stringify(originalPost)
    ) {
      await savePost();
    }
    stopEditing();
  };

  const handleKeyDown = (event) => {
    // If the 'Enter' key is pressed, save the post
    if (event.key === 'Enter') {
      savePost();
    }
    // If the 'Escape' key is pressed, stop editing
    else if (event.key === 'Escape') {
      stopEditing();
    }
  };

  const updateEditedPost = (field, value) => {
    setEditedPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleVisibilityChange = async (postId, visible) => {
    try {
      const post = posts.find((post) => post._id === postId); // Find the post by id
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/posts/${postId}`,
        {
          visible: visible,
          category: post.category, // Include the category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const categoryRef = useRef(null);
  const visibleRef = useRef(null);
  const slugRef = useRef(null);

  useEffect(() => {
    if (editing.field === 'title' && titleRef.current) {
      titleRef.current.focus();
    } else if (editing.field === 'author' && authorRef.current) {
      authorRef.current.focus();
    } else if (editing.field === 'category' && categoryRef.current) {
      categoryRef.current.focus();
    } else if (editing.field === 'visible' && visibleRef.current) {
      visibleRef.current.focus();
    } else if (editing.field === 'slug' && slugRef.current) {
      slugRef.current.focus();
    }
  }, [editing]);

  const handleUpdate = () => {
    setUpdateKey(updateKey + 1);
  };

  useEffect(() => {
    getPosts();
  }, [updateKey]);

  const tableCellStyle = { textAlign: 'left', verticalAlign: 'middle' };
  const tableCellButtonStyle = { textAlign: 'center', verticalAlign: 'middle' };

  return (
    <div style={{ padding: '20px' }}>
      <HTMLTable bordered={true} compact={true} interactive={false}>
        <thead>
          <tr>
            <th>Creation Date</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Visible</th>
            <th>Slug</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              {/* Creation Date */}
              <td className='non-editable-cell' style={tableCellStyle}>
                {new Date(post.dateCreated).toLocaleDateString()}
              </td>
              {/* Title */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(post, 'title')}
              >
                {editing.id === post._id && editing.field === 'title' ? (
                  <input
                    ref={titleRef}
                    type='text'
                    value={editedPost.title}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => updateEditedPost('title', e.target.value)}
                  />
                ) : (
                  post.title
                )}
              </td>
              {/* Author */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(post, 'author')}
              >
                {editing.id === post._id && editing.field === 'author' ? (
                  <input
                    ref={authorRef}
                    type='text'
                    value={editedPost.author}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => updateEditedPost('author', e.target.value)}
                  />
                ) : (
                  post.author
                )}
              </td>
              {/* Category */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(post, 'category')}
              >
                {editing.id === post._id && editing.field === 'category' ? (
                  <input
                    ref={categoryRef}
                    type='text'
                    value={editedPost.category}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedPost('category', e.target.value)
                    }
                  />
                ) : (
                  post.category
                )}
              </td>
              {/* Visible */}
              <td>
                <Switch
                  checked={post.visible}
                  onChange={(e) =>
                    handleVisibilityChange(post._id, e.target.checked)
                  }
                />
              </td>
              {/* Slug */}
              <td className='non-editable-cell' style={tableCellStyle}>
                {post.slug}
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='trash'
                  small={true}
                  minimal={true}
                  intent='danger'
                  onClick={() => deletePost(post._id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='edit'
                  small={true}
                  minimal={true}
                  onClick={() => {
                    setEditPostId(post._id);
                    setIsDrawerOpen(true);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        canEscapeKeyClose={true}
        isCloseButtonShown={true}
        autoFocus={true}
        shouldReturnFocusOnClose={true}
        size={DrawerSize.STANDARD}
        title='Edit Post'
        position={Position.RIGHT}
      >
        {editPostId && <Edit id={editPostId} onUpdate={handleUpdate} />}
      </Drawer>
    </div>
  );
};

export default BlogViewList;
