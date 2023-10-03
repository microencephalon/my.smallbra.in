// frontend/src/pages/admin/AccountSettings.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState({});
  const [editedUser, setEditedUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [activeFieldRef, setActiveFieldRef] = useState(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const birthdayRef = useRef(null);

  const fieldRefs = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    birthday: birthdayRef,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (activeFieldRef && activeFieldRef.current) {
      activeFieldRef.current.focus();
    }
  }, [activeFieldRef]);

  const startEditing = (field) => {
    setEditing({ field });
    setEditedUser(user);
    setOriginalUser(user);
    setActiveFieldRef(fieldRefs[field]);
  };

  const stopEditing = () => {
    setEditing({});
    setEditedUser(null);
    setOriginalUser(null);
    setActiveFieldRef(null);
  };

  const saveUser = async () => {
    if (window.confirm('Do you want to save changes?')) {
      try {
        const token = localStorage.getItem('token');
        const idResponse = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = idResponse.data.id; // Fetch the user ID
        await axios.patch(`/api/users/${userId}`, editedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(editedUser);
        stopEditing();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveIfChanged = async () => {
    if (
      editedUser &&
      originalUser &&
      JSON.stringify(editedUser) !== JSON.stringify(originalUser)
    ) {
      await saveUser();
    }
    stopEditing();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveUser();
    } else if (event.key === 'Escape') {
      stopEditing();
    }
  };

  const updateUser = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const formatAcctSetingsDate = (dateString) => {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // Offset in milliseconds
    const adjustedDate = new Date(date.getTime() + timezoneOffset);
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '40%' }}>
      <FormGroup label='Name' labelFor='name'>
        {editing.field === 'name' ? (
          <InputGroup
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            value={editedUser.name}
            onBlur={saveIfChanged}
            onKeyDown={handleKeyDown}
            onChange={(e) => updateUser('name', e.target.value)}
            inputRef={nameRef}
          />
        ) : (
          <InputGroup
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            value={user.name}
            onClick={() => startEditing('name')}
          />
        )}
      </FormGroup>

      <FormGroup label='Email' labelFor='email'>
        {editing.field === 'email' ? (
          <InputGroup
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            value={editedUser.email}
            onBlur={saveIfChanged}
            onKeyDown={handleKeyDown}
            onChange={(e) => updateUser('email', e.target.value)}
            inputRef={emailRef}
          />
        ) : (
          <InputGroup
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            value={user.email}
            onClick={() => startEditing('email')}
          />
        )}
      </FormGroup>

      <FormGroup label='Phone' labelFor='phone'>
        {editing.field === 'phone' ? (
          <InputGroup
            id='phone'
            name='phone'
            type='tel'
            placeholder='Enter your phone number'
            value={editedUser.phone}
            onBlur={saveIfChanged}
            onKeyDown={handleKeyDown}
            onChange={(e) => updateUser('phone', e.target.value)}
            inputRef={phoneRef}
          />
        ) : (
          <InputGroup
            id='phone'
            name='phone'
            type='tel'
            placeholder='Enter your phone number'
            value={user.phone}
            onClick={() => startEditing('phone')}
          />
        )}
      </FormGroup>

      <FormGroup label='Birthday' labelFor='birthday'>
        {editing.field === 'birthday' ? (
          <InputGroup
            id='birthday'
            name='birthday'
            type='date'
            value={editedUser.birthday}
            onBlur={saveIfChanged}
            onKeyDown={handleKeyDown}
            onChange={(e) => updateUser('birthday', e.target.value)}
            inputRef={birthdayRef}
          />
        ) : (
          <InputGroup
            id='birthday'
            name='birthday'
            type='date'
            value={formatAcctSetingsDate(user.birthday)}
            onClick={() => startEditing('birthday')}
          />
        )}
      </FormGroup>
    </div>
  );
};

export default AccountSettings;
