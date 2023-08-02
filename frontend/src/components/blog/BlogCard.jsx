import { Card, Text, Elevation } from '@blueprintjs/core';

export function BlogCard({ date, title, summary, className, onClick }) {
  return (
    <Card
      className={`blog-card ${className}`}
      elevation={Elevation.ZERO}
      onClick={onClick}
    >
      <Text tagName='span' className='blog-post-card-date'>
        {date}
      </Text>
      <Text className='blog-post-card-title'>{title}</Text>
      <Text tagName='p' className='blog-post-card-summary' ellipsize={false}>
        {summary}
      </Text>
    </Card>
  );
}

export default BlogCard;
