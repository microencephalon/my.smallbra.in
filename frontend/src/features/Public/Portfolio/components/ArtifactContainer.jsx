import { Card } from '@blueprintjs/core';

export const PortfolioArtifactContainer = ({ children }) => {
  return (
    <div id='artifact-container'>
      <Card
        interactive={false}
        onClick={undefined}
        className='artifact-container-card'
      >
        {children}
      </Card>
    </div>
  );
};
