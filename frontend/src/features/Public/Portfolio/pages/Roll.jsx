// frontend/src/features/Public/Portfolio/pages/Roll.jsx
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ArtifactCard from '../components/Card';
import Common from '../../../../shared/components/common';

import { useRoll } from '../../../../shared/hooks';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
        Template={ArtifactCard}
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
      <div className='artifact-row-wrapper'>
        <div className='artifact-row-container'>
          {artifacts.map((artifactObj, idx) => (
            <Fragment key={artifactObj._id}>
              {renderCard(artifactObj, idx)}
            </Fragment>
          ))}
        </div>
      </div>
      <Common.Roll.LoadMoreButton
        visibleWhen={[page < totalPages]}
        onClick={handleLoadMore}
        context={{ loading }}
      />
      <Common.CardFooterSpace />
    </div>
  );
};

export default PortfolioRoll;
