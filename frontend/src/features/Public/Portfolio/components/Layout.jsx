// frontend/src/features/Public/Portfolio/components/Layout.jsx
import Roll from '../pages/Roll';
import Artifact from '../pages/Artifact';
import Common from '../../../../shared/components/common';

const Portfolio = { Roll, Artifact };

const PortfolioLayout = ({ context }) => {
  return (
    <Common.FeatureLayout
      TopLevelComponent={<Portfolio.Roll context={context} />}
      DetailComponent={<Portfolio.Artifact context={context} />}
      context={context}
    />
  );
};

export default PortfolioLayout;
