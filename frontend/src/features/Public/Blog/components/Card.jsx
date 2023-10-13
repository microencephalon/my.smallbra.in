// frontend/src/features/Public/Blog/components/Card.jsx
import { Text } from '@blueprintjs/core';
import Common from '../../../../shared/components/common';

export function BlogCard({ data, onClick, context }) {
  let classNames = `blog-card blog-post-card ${
    data.isLoading ? 'bp5-skeleton' : ''
  }`;

  const PostDate = ({ children }) => {
    return (
      <Text tagName='span' className='blog-post-card-date'>
        {children}
      </Text>
    );
  };
  const Title = ({ children }) => {
    return <Text className='blog-post-card-title'>{children}</Text>;
  };
  const Summary = ({ children }) => {
    return (
      <Text tagName='p' className='blog-post-card-summary' ellipsize={false}>
        {children}
      </Text>
    );
  };
  const date = new Date(data.dateCreated).toLocaleDateString();

  return (
    <Common.FeatureCard className={classNames} onClick={onClick}>
      <PostDate>{date.date}</PostDate>
      <Title>{data.title}</Title>
      <Summary>{data.summary}</Summary>
    </Common.FeatureCard>
  );
}

export default BlogCard;
