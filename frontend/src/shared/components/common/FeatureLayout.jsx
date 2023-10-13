import { cloneElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Global from '../global';

const FeatureLayout = ({
  TopLevelComponent,
  DetailComponent = null,
  context,
}) => {
  return (
    <>
      <Routes>
        <Route path='' element={TopLevelComponent} />
        {DetailComponent && (
          <Route
            path='/:slug/:id'
            element={cloneElement(DetailComponent, { context })}
          />
        )}
        <Route path='*' element={<Global.ErrorCard responseCode={'404'} />} />
      </Routes>
    </>
  );
};

export default FeatureLayout;
