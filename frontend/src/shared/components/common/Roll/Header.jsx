import { Card, Text, Elevation } from '@blueprintjs/core';
const Header = ({ children, type }) => {
  const classNames = { header: null, title: null };

  switch (type) {
    case 'blog':
      classNames.header = 'blog-card blog-card-header';
      classNames.title = 'blog-post-card-title';
      break;
    case 'portfolio':
      classNames.header = 'portfolio-card portfolio-card-header';
      classNames.title = 'portfolio-artifact-card-title';
      break;
    default:
      break;
  }

  return (
    <Card className={classNames.header} elevation={Elevation.ZERO}>
      <Text className={classNames.title}>{children}</Text>
    </Card>
  );
};
export default Header;
