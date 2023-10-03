// frontend/src/components/AdminLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Resume from '../../pages/Resume';
import ErrorCard from '../global/ErrorCard';

const ResumeLayout = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Resume />} />
        <Route path='*' element={<ErrorCard responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default ResumeLayout;
