import CodeBlock from './Content/CodeBlock';
import Content from './Content';
import Card from './Card';
import { PostSpinner } from '../../../../shared/components/common/Spinners';

const Blog = {
  CodeBlock,
  Roll: { Card },
  Post: { Content, Spinner: PostSpinner },
};

export default Blog;
