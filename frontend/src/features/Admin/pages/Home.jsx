// frontend/src/features/Admin/pages/Home.jsx
const AdminHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <img
        src='http://localhost:8081/storage/images/smallbrain-logo3-flat.svg'
        alt='logo'
        style={{ width: 256, height: 'auto' }}
      />
      <h1 style={{ color: '#5F6B7C' }}>Admin Dashboard</h1>
      <p style={{ color: '#5F6B7C' }}>Welcome, Dana.</p>
    </div>
  );
};

export default AdminHome;
