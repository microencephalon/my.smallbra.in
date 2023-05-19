// frontend/src/pages/Blog/Upload.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:4500';

function Upload() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [file, setFile] = useState(null);
  const [slug, setSlug] = useState('');
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  // Example list of pre-existing categories
  const categories = ['Technology', 'Health', 'Lifestyle', 'Finance', 'Travel'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button has been clicked');

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', formattedDate);
    formData.append('author', author);
    formData.append(
      'category',
      isNewCategory ? newCategory.toLowerCase() : category.toLowerCase()
    );
    formData.append('file', file);
    formData.append('slug', slug.replace(/\s/g, '-').toLowerCase());
    formData.append('visible', visible);

    console.log('Sending form data:', formData);

    try {
      const response = await axios.post(`/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Server response:', response);

      if (response.status === 200) {
        // Reset the form
        setTitle('');
        setAuthor('');
        setCategory('');
        setFile(null);
        setSlug('');
        setVisible(true);

        // Navigate to the desired path after a successful submission
        navigate('/blog/upload'); // replace '/some/path' with the desired path
      }
    } catch (error) {
      console.error('Error uploading blog post:', error.message);
    }
  };

  return (
    <>
      {/* Inside the Layout component in the return statement */}
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />{' '}
        <br />
        <br />
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <br />
        {/* TODO: Need to set a separate categories data keeper in MongoDB */}
        <label htmlFor='category'>Category:</label>
        <select
          name='category'
          value={isNewCategory ? 'new' : category}
          onChange={(e) => {
            if (e.target.value === 'new') {
              setIsNewCategory(true);
              setNewCategory('');
            } else {
              setIsNewCategory(false);
              setCategory(e.target.value);
            }
          }}
          required
        >
          <option value='' disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value='new'>Create new category</option>
        </select>
        <br />
        <br />
        {isNewCategory && (
          <>
            <label htmlFor='newCategory'>New Category:</label>
            <input
              type='text'
              name='newCategory'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <br />
            <br />
          </>
        )}
        {/* Add a dropdown menu for pre-existing categories and new category */}
        <label htmlFor='content'>Content:</label>
        <input
          type='file'
          name='file'
          accept='.md,.mdx'
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br />
        <br />
        <label htmlFor='visible'>Visible:</label>
        <select
          name='visible'
          value={visible}
          onChange={(e) => setVisible(e.target.value === 'true')}
        >
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>
        <br />
        <br />
        <button type='submit'>Upload</button>
        <br />
      </form>
    </>
  );
}

export default Upload;
