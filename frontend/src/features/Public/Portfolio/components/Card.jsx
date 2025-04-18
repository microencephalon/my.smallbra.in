// frontend/src/features/Public/Portfolio/components/Card.jsx
import { useState } from 'react';
import {
  Text,
  Spinner,
  NonIdealState,
  NonIdealStateIconSize,
} from '@blueprintjs/core';
import Common from '../../../../shared/components/common';

export function ArtifactCard({ data, onClick, context }) {
  const [imageError, setImageError] = useState(null);
  const { windowWidth } = context.global;

  data.previewImage =
    !data.previewImage || data.previewImage === '' ? false : data.previewImage;

  // const date = new Date(data.dateCreated).toLocaleDateString();

  const responsiveClassName =
    windowWidth < 1037 ? 'portfolio-roll-card-vertical' : 'portfolio-roll-card';

  const classNames = `portfolio-card ${
    data.isLoading ? 'bp5-skeleton' : ''
  } ${responsiveClassName}`;

  const PreviewImage = () => {
    if (data.previewImage && !imageError) {
      return (
        <img
          src={data.previewImage}
          alt='Preview media of portfolio artifact'
          className='portfolio-card-preview-img'
          onLoad={() => <Spinner />}
          onError={() => {
            setImageError('Error occurred while retrieving the image.');
          }}
        />
      );
    } else {
      return (
        <NonIdealState
          className='portfolio-img-not-found'
          icon={imageError ? 'error' : 'issue'}
          iconSize={NonIdealStateIconSize.SMALL}
          title={imageError ? 'Error Loading Image' : 'Image Not Found'}
          description={
            imageError || "Sorry, an image doesn't exist for this item."
          }
        />
      );
    }
  };

  const Content = ({ children }) => {
    return <div className='portfolio-roll-card-content'>{children}</div>;
  };

  const Title = ({ children }) => {
    return <Text className='roll-card-title'>{children}</Text>;
  };

  const Teaser = ({ children }) => {
    return (
      <Text
        tagName='p'
        className='roll-card-preview-text portfolio-roll-card-description'
        ellipsize={false}
      >
        {children}
      </Text>
    );
  };

  return (
    <Common.FeatureCard className={classNames} onClick={onClick}>
      <PreviewImage />
      <Content>
        <Title>{data.title}</Title>
        <Teaser>{data.teaser}</Teaser>
      </Content>
    </Common.FeatureCard>
  );
}

export default ArtifactCard;
