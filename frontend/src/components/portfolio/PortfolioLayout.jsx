// frontend/src/components/PortfolioLayout.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioRoll from '../../pages/Portfolio/PortfolioRoll';
import PortfolioArtifact from '../../pages/Portfolio/PortfolioArtifact';
import ErrorCard from '../global/ErrorCard';

const PortfolioLayout = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<PortfolioRoll />} />
        <Route path='/:slug/:id' element={<PortfolioArtifact />} />
        <Route path='*' element={<ErrorCard responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default PortfolioLayout;
