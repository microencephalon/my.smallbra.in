import { Spinner } from '@blueprintjs/core';

const MenuSpinner = ({ size }) => {
  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <Spinner size={size} />
    </div>
  );
};

export default MenuSpinner;
