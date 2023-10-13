// frontend/src/features/Public/Portfolio/components/Layout.jsx
import About from './pages/About';
import Common from '../../../shared/components/common';

const AboutLayout = ({ searchBarContext }) => {
  return (
    <Common.FeatureLayout
      TopLevelComponent={<About />}
      DetailComponent={null}
      searchBarContext={searchBarContext}
    />
  );
};

export default AboutLayout;
