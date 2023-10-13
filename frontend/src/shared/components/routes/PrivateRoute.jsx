// frontend/src/components/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import { Spinner, SpinnerSize } from '@blueprintjs/core';

const PrivateRoute = ({ element: Component }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner size={SpinnerSize.SMALL} />;
  }
  if (loggedIn) {
    return Component;
  }
  return <Navigate to='/auth' />;
};

export default PrivateRoute;
