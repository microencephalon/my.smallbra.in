// frontend/src/features/Public/Home/pages/Home.jsx
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Common from '../../../shared/components/common';
import BlogCard from '../Blog/components/Card';

import { useRoll } from '../../../shared/hooks';

const Home = ({ context }) => {
  const navigate = useNavigate();

  const { items: posts } = useRoll('posts', '/api/posts?home', null);

  const renderCard = (data) => {
    const classNames = { containerClass: 'blog-roll-card-container' };
    const where = `/blog/${data.slug}/${data._id}`;
    return (
      <Common.Roll.Card
        key={`home-roll-card-${data._id}`}
        Template={BlogCard}
        data={data}
        classNames={classNames}
        onClick={() => navigate(where)}
        context={context}
      />
    );
  };

  return (
    <div id='home-container'>
      <Common.HomeLogo />
      <Common.Roll.Header type={'blog'}>Latest</Common.Roll.Header>
      {posts.map((data) => (
        <Fragment key={data._id}>{renderCard(data)}</Fragment>
      ))}
      <Common.Roll.FooterSpace />
    </div>
  );
};

export default Home;
