// frontend/src/features/Public/Blog/pages/Post.jsx
import { useParams } from 'react-router-dom';

import '../../../../store/css/blog-posts.css';

import Blog from '../components';
import Global from '../../../../shared/components/global';

import { useFetchData } from '../../../../shared/hooks';

function BlogPost({ context }) {
  const { id: idFromParams } = useParams();
  const { isFetching, isNotFound } = useFetchData.blog.post(idFromParams);

  if (isFetching && !isNotFound) {
    return <Blog.Post.Spinner />;
  }
  if (isNotFound) {
    return <Global.ErrorCard responseCode={'404'} />;
  }

  return (
    <div id='blog-post-container'>
      <div id='blog-post'>
        {/* <Blog.TOC /> */}
        <Blog.Post.Content context={context} />
        {/* Blog.Post.MoreArticles */}
      </div>
    </div>
  );
}

export default BlogPost;
