// frontend/src/features/Public/Resume/components/Layout.jsx
import Resume from '../pages/Resume';
import Common from '../../../../shared/components/common';

const ResumeLayout = ({ searchBarContext }) => {
  return (
    <Common.FeatureLayout
      TopLevelComponent={<Resume />}
      DetailComponent={null}
      searchBarContext={searchBarContext}
    />
  );
};

export default ResumeLayout;
