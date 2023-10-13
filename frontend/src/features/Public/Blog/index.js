// frontend/src/features/Public/Blog/components/Layout.jsx
import Common from '../../../shared/components/common';
import Roll from './pages/Roll';
import Post from './pages/Post';

const Blog = { Roll, Post };

const BlogLayout = ({ context }) => {
  return (
    <Common.FeatureLayout
      TopLevelComponent={<Blog.Roll context={context} />}
      DetailComponent={<Blog.Post context={context} />}
      context={context}
    />
  );
};

export default BlogLayout;
