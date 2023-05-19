import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

axios.defaults.baseURL = 'http://localhost:4500';

const ViewList = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState({}); // change null to {}
  const [editedPost, setEditedPost] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);

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
      await axios.delete(`/api/posts/${id}`);
      getPosts();
    }
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
      console.log(editedPost);
      await axios.patch(`/api/posts/${editedPost._id}`, editedPost);
      stopEditing();
      getPosts();
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

  useEffect(() => {
    console.log(editedPost);
  }, [editedPost]);

  const updateEditedPost = (field, value) => {
    setEditedPost((prev) => ({ ...prev, [field]: value }));
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

  const navigate = useNavigate();

  return (
    <div>
      <table>
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
              <td className='non-editable-cell'>
                {new Date(post.dateCreated).toLocaleDateString()}
              </td>
              {/* Title */}
              <td
                className='editable-cell'
                onClick={() => startEditing(post, 'title')}
                style={
                  editing.id === post._id && editing.field === 'title'
                    ? { fontSize: '16px', color: 'blue' }
                    : {}
                }
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
                onClick={() => startEditing(post, 'author')}
                style={
                  editing.id === post._id && editing.field === 'author'
                    ? { fontSize: '16px', color: 'blue' }
                    : {}
                }
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
                onClick={() => startEditing(post, 'category')}
                style={
                  editing.id === post._id && editing.field === 'category'
                    ? { fontSize: '16px', color: 'blue' }
                    : {}
                }
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
              <td
                className='editable-cell'
                onClick={() => startEditing(post, 'visible')}
                style={
                  editing.id === post._id && editing.field === 'visible'
                    ? { fontSize: '16px', color: 'blue' }
                    : {}
                }
              >
                {editing.id === post._id && editing.field === 'visible' ? (
                  <select
                    ref={visibleRef}
                    value={editedPost.visible}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedPost('visible', e.target.value === 'true')
                    }
                  >
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                  </select>
                ) : post.visible ? (
                  'True'
                ) : (
                  'False'
                )}
              </td>
              {/* Slug */}
              <td className='non-editable-cell'>{post.slug}</td>
              <td>
                <FaTrash
                  onClick={() => deletePost(post._id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td>
                <FaEdit
                  onClick={() => navigate(`/blog/edit/${post._id}`)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewList;
