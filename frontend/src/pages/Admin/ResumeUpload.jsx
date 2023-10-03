// frontend/src/Admin/ResumeUpload.jsx
import '@blueprintjs/core/lib/css/blueprint.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FileInput,
  FormGroup,
  InputGroup,
  Button,
  HTMLSelect,
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
  const [current, setCurrent] = useState(true);
  const [file, setFile] = useState(null);

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
    formData.append('file', file);
    formData.append('current', current);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/resumes`, formData, {
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
        setFile(null);
        setCurrent(true);

        navigate(`/admin/resumes`);
      }
    } catch (error) {
      AppToaster.show({
        message: `Error uploading resume: ${error.message}`,
        intent: Intent.DANGER,
      });
      console.error('Error uploading resume:', error.message);
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

        <FormGroup label='Author' labelFor='author' labelInfo='(required)'>
          <InputGroup
            id='author'
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormGroup>

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

        <FormGroup label='Current' labelFor='current' labelInfo='(required)'>
          <HTMLSelect
            id='current'
            name='current'
            value={current}
            onChange={(e) => setCurrent(e.target.value === 'true')}
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
