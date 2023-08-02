// frontend/src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // use useNavigate instead of useHistory
import {
  Tab,
  Tabs,
  FormGroup,
  InputGroup,
  Button,
  Card,
  Elevation,
  OverlayToaster,
  Position,
  Intent,
  Icon,
} from '@blueprintjs/core';

import { useAuth } from '../store/contexts/AuthContext'; // Import useAuth hook here

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Create Toaster outside of Auth function
const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

const Auth = () => {
  const navigate = useNavigate(); // Add this line
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // Check if the browser is Safari

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tabId, setTabId] = useState('login');
  const [renderInputGroup, setRenderInputGroup] = useState(
    isSafari ? false : true
  );

  const { setIsAdmin, setToken } = useAuth(); // Use this hook to get setIsAdmin

  useEffect(() => {
    const handleGithubCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          setToken(token);
          localStorage.setItem('token', token);
          setIsAdmin(true);
          navigate('/admin/');
          AppToaster.show({
            intent: Intent.SUCCESS,
            isCloseButtonShown: false,
            message: 'Login successful!',
            timeout: 2500,
          });
        } catch (error) {
          console.error(error);
          AppToaster.show({
            intent: Intent.DANGER,
            isCloseButtonShown: false,
            message: 'Login failed!',
            timeout: 2500,
          });
        }
      }
    };

    handleGithubCallback();
  }, [setIsAdmin, setToken, navigate]);

  useEffect(() => {
    if (isSafari) {
      const timer = setTimeout(() => {
        // Forces a re-render by changing the state
        // setRenderKey(Math.random());
        setRenderInputGroup(true);
      }, 1000); // Wait for 1 second before forcing a re-render

      return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
    }
  }, [isSafari]);

  const handleGithubLogin = () => {
    window.location.href = `${axios.defaults.baseURL}/api/oauth/github`;
  };

  const handleTabChange = (newTabId) => {
    setTabId(newTabId);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tabId === 'login') {
      try {
        const response = await axios.post('/api/users/login', {
          email,
          password,
        });
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          setIsAdmin(true); // Set isAdmin to true after successful login
          setToken(token);
          navigate('/admin/'); // change history.push to navigate
          AppToaster.show({
            intent: Intent.SUCCESS,
            isCloseButtonShown: false,
            message: 'Login successful!',
            timeout: 2500,
          }); // show success toast
        }
      } catch (error) {
        console.error(error);
        AppToaster.show({
          intent: Intent.DANGER,
          isCloseButtonShown: false,
          message: 'Login failed!',
          timeout: 2500,
        }); // show error toast
      }
    } else if (tabId === 'register') {
      try {
        if (password !== confirmPassword) {
          AppToaster.show({
            intent: Intent.WARNING,
            isCloseButtonShown: false,
            message: "Passwords don't match!",
            timeout: 2500,
          }); // show error toast
          console.warn("Passwords don't match!");
          return;
        }
        const response = await axios.post('/api/users', { email, password });
        if (response.status === 201 || response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          setIsAdmin(true); // Set isAdmin to true after successful login
          setToken(token);
          AppToaster.show({
            intent: Intent.SUCCESS,
            isCloseButtonShown: false,
            message: 'Registration successful!',
            timeout: 2500,
          });
          navigate('/admin/');
        }
      } catch (error) {
        console.error(error);
        console.error('Registration failed.');
        AppToaster.show({
          intent: Intent.DANGER,
          isCloseButtonShown: false,
          message: 'Registration failed!',
          timeout: 2500,
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ margin: '2% 30% 0 30%' }}>
      <Card elevation={Elevation.TWO}>
        <h2>{tabId === 'login' ? 'Login' : 'Register'}</h2>
        <Tabs id='authTabs' onChange={handleTabChange} selectedTabId={tabId}>
          <Tab
            id='login'
            title='Login'
            disabled={false}
            panel={
              <form onSubmit={handleSubmit}>
                <FormGroup label='Email' labelFor='email'>
                  <InputGroup
                    className={!renderInputGroup ? 'bp5-skeleton' : ''}
                    id='email'
                    type='email'
                    leftElement={
                      <Icon icon='envelope' intent={Intent.PRIMARY} />
                    }
                    onChange={handleEmailChange}
                  />
                </FormGroup>
                <FormGroup label='Password' labelFor='password'>
                  <InputGroup
                    className={!renderInputGroup ? 'bp5-skeleton' : ''}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    leftElement={
                      <Button
                        icon={showPassword ? 'eye-on' : 'eye-off'}
                        onClick={toggleShowPassword}
                        intent={Intent.WARNING}
                        minimal={true}
                        style={{ color: '#5F6B7C' }}
                      />
                    }
                    onChange={handlePasswordChange}
                  />
                </FormGroup>
                <Button type='submit'>Login</Button>
                <Button onClick={handleGithubLogin}>Login with GitHub</Button>
              </form>
            }
          />
          <Tab
            id='register'
            title='Register'
            disabled={false}
            panel={
              <form onSubmit={handleSubmit}>
                <FormGroup label='Email' labelFor='email-register'>
                  <InputGroup
                    id='email-register'
                    placeholder='Enter your email...'
                    disabled={false}
                    onChange={handleEmailChange}
                  />
                </FormGroup>
                <FormGroup label='Password' labelFor='password-register'>
                  <InputGroup
                    id='password-register'
                    placeholder='Enter your password...'
                    type='password'
                    disabled={false}
                    onChange={handlePasswordChange}
                  />
                </FormGroup>
                <FormGroup label='Confirm Password' labelFor='confirm-password'>
                  <InputGroup
                    id='confirm-password'
                    placeholder='Confirm your password...'
                    type='password'
                    disabled={false}
                    onChange={handleConfirmPasswordChange}
                  />
                </FormGroup>
                <Button type='submit'>Register</Button>
              </form>
            }
          />
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
