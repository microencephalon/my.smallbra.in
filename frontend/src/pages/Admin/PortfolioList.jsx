// frontend/src/pages/Admin/ViewList.jsx
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

import Edit from './PortfolioArtifactEdit';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const ViewList = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [editing, setEditing] = useState({}); // change null to {}
  const [editedArtifact, setEditedArtifact] = useState(null);
  const [originalArtifact, setOriginalArtifact] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editArtifactId, setEditArtifactId] = useState(null);

  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    getArtifacts();
  }, []);

  const getArtifacts = async () => {
    const response = await axios.get('/api/artifacts');
    setArtifacts(response.data);
  };

  const deleteArtifact = async (id) => {
    const userConfirmed = window.confirm('Do you want to delete?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/artifacts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        AppToaster.show({
          message: 'Successfully deleted portfolio artifact!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
        getArtifacts();
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

  const handleKeyDown = (event) => {
    // If the 'Enter' key is pressed, save the artifact
    if (event.key === 'Enter') {
      saveArtifact();
    }
    // If the 'Escape' key is pressed, stop editing
    else if (event.key === 'Escape') {
      stopEditing();
    }
  };

  const startEditing = (artifact, field) => {
    setEditing({ id: artifact._id, field: field });
    setEditedArtifact(artifact);
    setOriginalArtifact(artifact);
  };

  const stopEditing = () => {
    setEditing({}); // change null to {}
    setEditedArtifact(null);
    setOriginalArtifact(null);
  };

  const saveArtifact = async () => {
    const userConfirmed = window.confirm('Do you want to save changes?');
    if (userConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `/api/artifacts/${editedArtifact._id}`,
          editedArtifact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        AppToaster.show({
          message: 'Update successful!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
        stopEditing();
        getArtifacts();
      } catch (error) {
        AppToaster.show({
          message: 'Error updating portfolio artifact!',
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
      editedArtifact &&
      originalArtifact &&
      JSON.stringify(editedArtifact) !== JSON.stringify(originalArtifact)
    ) {
      await saveArtifact();
    }
    stopEditing();
  };

  const updateEditedArtifact = (field, value) => {
    setEditedArtifact((prev) => ({ ...prev, [field]: value }));
  };

  const handleVisibilityChange = async (artifactId, visible) => {
    try {
      const artifact = artifacts.find(
        (artifact) => artifact._id === artifactId
      ); // Find the post by id
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/artifacts/${artifactId}`,
        {
          visible: visible,
          category: artifact.category, // Include the category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getArtifacts();
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
    getArtifacts();
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
          {artifacts.map((artifact) => (
            <tr key={artifact._id}>
              {/* Creation Date */}
              <td className='non-editable-cell' style={tableCellStyle}>
                {new Date(artifact.dateCreated).toLocaleDateString()}
              </td>
              {/* Title */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(artifact, 'title')}
              >
                {editing.id === artifact._id && editing.field === 'title' ? (
                  <input
                    ref={titleRef}
                    type='text'
                    value={editedArtifact.title}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedArtifact('title', e.target.value)
                    }
                  />
                ) : (
                  artifact.title
                )}
              </td>
              {/* Author */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(artifact, 'author')}
              >
                {editing.id === artifact._id && editing.field === 'author' ? (
                  <input
                    ref={authorRef}
                    type='text'
                    value={editedArtifact.author}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedArtifact('author', e.target.value)
                    }
                  />
                ) : (
                  artifact.author
                )}
              </td>
              {/* Category */}
              <td
                className='editable-cell'
                style={tableCellStyle}
                onClick={() => startEditing(artifact, 'category')}
              >
                {editing.id === artifact._id && editing.field === 'category' ? (
                  <input
                    ref={categoryRef}
                    type='text'
                    value={editedArtifact.category}
                    onBlur={saveIfChanged}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      updateEditedArtifact('category', e.target.value)
                    }
                  />
                ) : (
                  artifact.category
                )}
              </td>
              {/* Visible */}
              <td>
                <Switch
                  checked={artifact.visible}
                  onChange={(e) =>
                    handleVisibilityChange(artifact._id, e.target.checked)
                  }
                />
              </td>
              {/* Slug */}
              <td className='non-editable-cell' style={tableCellStyle}>
                {artifact.slug}
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='trash'
                  small={true}
                  minimal={true}
                  intent='danger'
                  onClick={() => deleteArtifact(artifact._id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={tableCellButtonStyle}>
                <Button
                  icon='edit'
                  small={true}
                  minimal={true}
                  onClick={() => {
                    setEditArtifactId(artifact._id);
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
        size={DrawerSize.LARGE}
        title='Edit Portfolio Artifact'
        position={Position.RIGHT}
      >
        {editArtifactId && <Edit id={editArtifactId} onUpdate={handleUpdate} />}
      </Drawer>
    </div>
  );
};

export default ViewList;
