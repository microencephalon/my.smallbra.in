// frontend/src/components/AdminLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Resume from '../../pages/Resume';
import Error from '../../pages/Error';

const ResumeLayout = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Resume />} />
        <Route path='*' element={<Error responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default ResumeLayout;
