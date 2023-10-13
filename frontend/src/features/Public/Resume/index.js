// frontend/src/features/Public/Resume/components/Layout.jsx
import Resume from './pages/Resume';
import Common from '../../../shared/components/common';

const ResumeLayout = ({ context }) => {
  return (
    <Common.FeatureLayout
      TopLevelComponent={<Resume />}
      DetailComponent={null}
      context={context}
    />
  );
};

export default ResumeLayout;
