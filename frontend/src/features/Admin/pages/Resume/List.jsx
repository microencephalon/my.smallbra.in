// frontend/src/pages/Blog/ResumeList.jsx
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

import Edit from '../Resume/Edit';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const ViewList = () => {
  const [resumes, setResumes] = useState([]);
  const [editing, setEditing] = useState({}); // change null to {}
  const [editedResume, setEditedResume] = useState(null);
  const [originalResume, setOriginalResume] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);

  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    getResumes();
  }, []);

  const getResumes = async () => {
    const response = await axios.get('/api/resumes');
    setResumes(response.data);
  };

  const deleteResumes = async (id) => {
    const userConfirmed = window.confirm('Do you want to delete?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/resumes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        AppToaster.show({
          message: 'Successfully deleted resume!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
        getResumes();
      } catch (error) {
        AppToaster.show({
          message: 'Error deleting resume!',
          isCloseButtonShown: false,
          intent: Intent.DANGER,
          timeout: 2500,
        });
        console.error(error);
      }
    }
  };

  const startEditing = (resume, field) => {
    setEditing({ id: resume._id, field: field });
    setEditedResume(resume);
    setOriginalResume(resume);
  };

  const stopEditing = () => {
    setEditing({}); // change null to {}
    setEditedResume(null);
    setOriginalResume(null);
  };

  const saveResume = async () => {
    const userConfirmed = window.confirm('Do you want to save changes?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`/api/resumes/${editedResume._id}`, editedResume, {
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
        getResumes();
      } catch (error) {
        AppToaster.show({
          message: 'Error updating résumé!',
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
      editedResume &&
      originalResume &&
      JSON.stringify(editedResume) !== JSON.stringify(originalResume)
    ) {
      await saveResume();
    }
    stopEditing();
  };

  const handleKeyDown = (event) => {
    // If the 'Enter' key is pressed, save the resume
    if (event.key === 'Enter') {
      saveResume();
    }
    // If the 'Escape' key is pressed, stop editing
    else if (event.key === 'Escape') {
      stopEditing();
    }
  };

  const updateEditedResume = (field, value) => {
    setEditedResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentChange = async (resumeId, current) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/resumes/${resumeId}`,
        {
          current: current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getResumes();
    } catch (error) {
      console.error(error);
    }
  };

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const currentRef = useRef(null);

  useEffect(() => {
    if (editing.field === 'title' && titleRef.current) {
      titleRef.current.focus();
    } else if (editing.field === 'author' && authorRef.current) {
      authorRef.current.focus();
    } else if (editing.field === 'current' && currentRef.current) {
      currentRef.current.focus();
    }
  }, [editing]);

  const handleUpdate = () => {
    setUpdateKey(updateKey + 1);
  };

  useEffect(() => {
    getResumes();
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
            <th>Current</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((post) => (
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
                    value={editedResume.title}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedResume('title', e.target.value)
                    }
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
                    value={editedResume.author}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedResume('author', e.target.value)
                    }
                  />
                ) : (
                  post.author
                )}
              </td>
              {/* Current */}
              <td>
                <Switch
                  checked={post.current}
                  onChange={(e) =>
                    handleCurrentChange(post._id, e.target.checked)
                  }
                />
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='trash'
                  small={true}
                  minimal={true}
                  intent='danger'
                  onClick={() => deleteResumes(post._id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='edit'
                  small={true}
                  minimal={true}
                  onClick={() => {
                    setEditResumeId(post._id);
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
        title='Edit Résumé'
        position={Position.RIGHT}
      >
        {editResumeId && <Edit id={editResumeId} onUpdate={handleUpdate} />}
      </Drawer>
    </div>
  );
};

export default ViewList;
