// frontend/src/pages/Admin/BlogEdit.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FormGroup,
  InputGroup,
  Button,
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
  const [resume, setResume] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resumes/${id}`);
        setResume(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResume();
  }, [id, refreshCount]);

  const handleResumeUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/resumes/${id}`, resume, {
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
        message: 'Error updating résumé!',
        isCloseButtonShown: false,
        intent: Intent.DANGER,
        timeout: 2500,
      });
      console.error('Error updating résumé:', error);
    }
  };

  if (!resume) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <FormGroup label='Title:' labelFor='title' style={{ width: '50%' }}>
        <InputGroup
          id='title'
          value={resume.title}
          onChange={(e) => setResume({ ...resume, title: e.target.value })}
        />
      </FormGroup>

      <FormGroup label='Author:' labelFor='author' style={{ width: '50%' }}>
        <InputGroup
          id='author'
          value={resume.author}
          onChange={(e) => setResume({ ...resume, author: e.target.value })}
        />
      </FormGroup>
      <FormGroup label='Current:' labelFor='current' style={{ width: '50%' }}>
        <Switch
          id='current'
          label={resume.current ? 'True' : 'False'}
          checked={resume.current}
          onChange={(e) => setResume({ ...resume, current: e.target.checked })}
        />
      </FormGroup>
      <FormGroup
        label='Date Created:'
        labelFor='dateCreated'
        style={{ width: '50%' }}
      >
        <InputGroup
          id='dateCreated'
          disabled='true'
          value={new Date(resume.dateCreated).toLocaleDateString()}
        />
      </FormGroup>
      <FormGroup>
        <Link to={`/admin/resumes/${id}`} style={{ textDecoration: 'none' }}>
          <Button
            icon='edit'
            text='Edit Markdown File'
            outlined={true}
            intent={Intent.PRIMARY}
          />
        </Link>
      </FormGroup>

      <Button onClick={handleResumeUpdate}>Save</Button>
    </div>
  );
};

export default Edit;
