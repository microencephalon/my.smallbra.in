// frontend/src/hooks/useAuthStatus.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks';

const useAuthStatus = () => {
  const navigate = useNavigate();

  const [checkingStatus, setCheckingStatus] = useState(true);
  const { isAdmin, setIsAdmin } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to the /verify-if-admin route
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/verify-if-admin', {
          // Update this URL with your backend's URL where isAdmin middleware is used
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is stored in localStorage
          },
        });

        // Set the isAdmin status based on the server response
        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        setCheckingStatus(false);
      } catch (error) {
        setIsAdmin(false);
        setCheckingStatus(false);
      }
    };

    checkAuthStatus();
  }, [isAdmin, setIsAdmin, navigate]);

  return { loggedIn: isAdmin, checkingStatus };
};

export default useAuthStatus;
