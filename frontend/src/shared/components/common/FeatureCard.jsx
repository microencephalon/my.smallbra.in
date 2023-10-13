import { Card, Elevation } from '@blueprintjs/core';

const FeatureCard = ({ children, className, onClick }) => {
  return (
    <Card className={className} elevation={Elevation.ZERO} onClick={onClick}>
      {children}
    </Card>
  );
};

export default FeatureCard;
