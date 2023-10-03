// frontend/src/components/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { Spinner, SpinnerSize } from '@blueprintjs/core';

const PrivateRoute = ({ component: Component }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner size={SpinnerSize.SMALL} />;
  }

  return loggedIn ? <Component /> : <Navigate to='/auth' />;
};

export default PrivateRoute;
