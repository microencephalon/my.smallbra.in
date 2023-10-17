import { Card, Text, Elevation } from '@blueprintjs/core';
const Header = ({ children, type }) => {
  const classNames = { header: null, title: null };

  switch (type) {
    case 'blog':
      classNames.header = 'blog-card roll-card-header';
      classNames.title = 'roll-card-title';
      break;
    case 'portfolio':
      classNames.header =
        'portfolio-card roll-card-header portfolio-card-header';
      classNames.title = 'roll-card-title';
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
