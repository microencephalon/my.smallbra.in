// frontend/src/pages/Admin/ResumeEditMarkdown.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FormGroup,
  TextArea,
  Button,
  OverlayToaster,
  Position,
  Intent,
  Tabs,
  Tab,
} from '@blueprintjs/core';
import Markdown from 'markdown-to-jsx';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.BOTTOM,
  canEscapeKeyClear: true,
});

const ResumeEditMarkdown = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [markdown, setMarkdown] = useState('');

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
  }, [id]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (resume) {
        try {
          const response = await fetch(
            `http://localhost:8081/${resume.content}?v=${Date.now()}`
          );
          const text = await response.text();
          setMarkdown(text);
        } catch (err) {
          console.error(`http://localhost:8081/${resume.content}`);
          console.error('Error fetching markdown file:' + err);
        }
      }
    };

    fetchMarkdown();
  }, [resume]);

  const handleMarkdownUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/resumes/update-resume/${id}`,
        { markdown: markdown },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        AppToaster.show({
          message: 'Markdown update successful!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
      }
    } catch (err) {
      AppToaster.show({
        message: 'Error updating markdown!',
        isCloseButtonShown: false,
        intent: Intent.DANGER,
        timeout: 2500,
      });
      console.error('Error updating markdown:', err);
    }
  };

  const boxShadowSettings =
    'rgba(45, 114, 210, 0) 0px 0px 0px 0px, rgba(45, 114, 210, 0) 0px 0px 0px 0px, rgba(17, 20, 24, 0.2) 0px 0px 0px 1px inset, rgba(17, 20, 24, 0.5) 0px 1px 1px 0px inset';

  if (!resume) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{resume.title}</h2>
      <Tabs id='EditMarkdown' animate={true} large={true}>
        <Tab
          id='edit'
          title='Edit'
          panel={
            <FormGroup>
              <TextArea
                id='markdown'
                value={markdown}
                fill={true}
                growVertically={true}
                onChange={(e) => setMarkdown(e.target.value)}
                style={{ resize: 'none' }}
              />
            </FormGroup>
          }
        />
        <Tab
          id='preview'
          title='Preview'
          panel={
            <FormGroup>
              <Markdown
                style={{
                  borderRadius: '2px',
                  boxSizing: 'border-box',
                  backgroundClip: 'border-box',
                  boxShadow: boxShadowSettings,
                  padding: '10px',
                }}
              >
                {markdown}
              </Markdown>
            </FormGroup>
          }
        />
      </Tabs>
      <Button onClick={handleMarkdownUpdate}>Save</Button>
    </div>
  );
};

export default ResumeEditMarkdown;
