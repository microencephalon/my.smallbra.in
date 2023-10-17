// frontend/src/features/Public/Portfolio/pages/Roll.jsx
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Portfolio from '../components';
import Common from '../../../../shared/components/common';

import { useRoll } from '../../../../shared/hooks';

const PortfolioRoll = ({ context }) => {
  const navigate = useNavigate();

  const {
    items: artifacts,
    loading,
    handleLoadMore,
    totalPages,
    page,
  } = useRoll(
    'artifacts',
    '/api/artifacts?page=1',
    (nextPage) => `/api/artifacts?page=${nextPage}`
  );

  const renderCard = (data) => {
    const classNames = { containerClass: 'artifact-card-container' };
    const where = `/portfolio/${data.slug}/${data._id}`;
    return (
      <Common.Roll.Card
        key={`portfolio-roll-card-${data._id}`}
        Template={Portfolio.Roll.Card}
        data={data}
        classNames={classNames}
        onClick={() => navigate(where)}
        context={context}
      />
    );
  };

  return (
    <div className='portfolio-roll-container'>
      <Common.HomeLogo />
      <Common.Roll.Header type='portfolio'>Artifacts</Common.Roll.Header>
      <div className='portfolio-roll-row-wrapper'>
        <div className='portfolio-roll-row-container'>
          {artifacts.map((artifactObj) => (
            <Fragment key={artifactObj._id}>{renderCard(artifactObj)}</Fragment>
          ))}
        </div>
      </div>
      <Common.Roll.LoadMoreButton
        visibleWhen={[page < totalPages]}
        onClick={handleLoadMore}
        context={{ loading }}
      />
      <Common.Roll.FooterSpace />
    </div>
  );
};

export default PortfolioRoll;
