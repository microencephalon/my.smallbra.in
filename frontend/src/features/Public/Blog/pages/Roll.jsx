// frontend/src/features/Public/Blog/pages/Roll.jsx
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import BlogCard from '../components/Card';
import Common from '../../../../shared/components/common';
import { useRoll } from '../../../../shared/hooks';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Blogroll = ({ context }) => {
  const navigate = useNavigate();

  const {
    items: posts,
    loading,
    handleLoadMore,
    totalPages,
    page,
  } = useRoll(
    'posts',
    '/api/posts?page=1',
    (nextPage) => `/api/posts?page=${nextPage}`
  );

  const renderCard = (data) => {
    const classNames = { containerClass: 'blog-post-card-container' };
    const where = `/blog/${data.slug}/${data._id}`;
    return (
      <Common.Roll.Card
        Template={BlogCard}
        data={data}
        classNames={classNames}
        onClick={() => navigate(where)}
        context={context}
      />
    );
  };

  return (
    <div className='blogroll-container'>
      <Common.HomeLogo />
      <Common.Roll.Header type={'blog'}>Articles</Common.Roll.Header>
      {posts.map((data) => (
        <Fragment key={data._id}>{renderCard(data)}</Fragment>
      ))}
      <Common.Roll.LoadMoreButton
        visibleWhen={[page < totalPages]}
        onClick={handleLoadMore}
        context={{ loading }}
      />

      <Common.CardFooterSpace />
    </div>
  );
};

export default Blogroll;
