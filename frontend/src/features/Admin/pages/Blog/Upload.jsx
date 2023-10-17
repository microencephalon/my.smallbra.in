// frontend/src/pages/Blog/Upload.jsx
import '@blueprintjs/core/lib/css/blueprint.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FileInput,
  FormGroup,
  InputGroup,
  Button,
  HTMLSelect,
  TextArea,
  OverlayToaster,
  Position,
  Intent,
} from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
});

function Upload() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [file, setFile] = useState(null);
  const [slug, setSlug] = useState('');
  const [visible, setVisible] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/post-categories');
        const categoryNames = response.data.map((category) => category.name);
        setCategoriesList(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', formattedDate);
    formData.append('author', author);
    formData.append('summary', summary);
    formData.append(
      'category',
      isNewCategory ? newCategory.toLowerCase() : category.toLowerCase()
    );
    formData.append('file', file);
    formData.append('slug', slug.replace(/\s/g, '-').toLowerCase());
    formData.append('visible', visible);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        AppToaster.show({
          message: 'Upload successful!',
          intent: Intent.SUCCESS,
        });

        // Reset the form
        setTitle('');
        setAuthor('');
        setSummary('');
        setCategory('');
        setFile(null);
        setSlug('');
        setVisible(true);

        navigate(`/admin/blog`);
      }
    } catch (error) {
      AppToaster.show({
        message: `Error uploading blog post: ${error.message}`,
        intent: Intent.DANGER,
      });
      console.error('Error uploading blog post:', error.message);
    }
  };

  return (
    <div style={{ padding: '20px', width: '35%' }}>
      <form onSubmit={handleSubmit}>
        <FormGroup label='Title' labelFor='title' labelInfo='(required)'>
          <InputGroup
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label='Summary' labelFor='summary' labelInfo='(optional)'>
          <TextArea
            id='summary'
            value={summary}
            fill={true}
            autoResize={true}
            onChange={(e) => setSummary(e.target.value)}
            style={{ resize: 'none' }}
          />
        </FormGroup>
        <FormGroup label='Author' labelFor='author' labelInfo='(required)'>
          <InputGroup
            id='author'
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup label='Category' labelFor='category' labelInfo='(required)'>
          <HTMLSelect
            id='category'
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
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value='new'>Create new category</option>
          </HTMLSelect>
        </FormGroup>

        {isNewCategory && (
          <FormGroup label='New Category' labelFor='newCategory'>
            <InputGroup
              id='newCategory'
              name='newCategory'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </FormGroup>
        )}

        <FormGroup label='Content' labelFor='content' labelInfo='(required)'>
          <FileInput
            id='content'
            name='content'
            fill={true}
            inputProps={{
              accept: '.md,.mdx',
              required: true,
              onChange: (e) => setFile(e.target.files[0]),
            }}
            text={file ? file.name : 'Select .md or .mdx file...'}
          />
        </FormGroup>

        <FormGroup label='Visible' labelFor='visible' labelInfo='(required)'>
          <HTMLSelect
            id='visible'
            name='visible'
            value={visible}
            onChange={(e) => setVisible(e.target.value === 'true')}
          >
            <option value='true'>True</option>
            <option value='false'>False</option>
          </HTMLSelect>
        </FormGroup>

        <Button icon='upload' intent='primary' type='submit'>
          Upload
        </Button>
      </form>
    </div>
  );
}

export default Upload;
