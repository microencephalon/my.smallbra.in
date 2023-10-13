// frontend/src/features/Public/Home/pages/Home.jsx
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Common from '../../../../shared/components/common';
import BlogCard from '../../Blog/components/Card';

import { useRoll } from '../../../../shared/hooks';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Home({ context }) {
  const navigate = useNavigate();
  const { items: posts } = useRoll('posts', '/api/posts?home', null);

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
    <div className='home-container'>
      <Common.HomeLogo />
      <Common.Roll.Header type={'blog'}>Latest</Common.Roll.Header>
      {posts.map((data) => (
        <Fragment key={data._id}>{renderCard(data)}</Fragment>
      ))}
      <div className='card-footer-bottom-space' />
    </div>
  );
}

export default Home;
