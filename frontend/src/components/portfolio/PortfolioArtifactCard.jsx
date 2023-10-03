import { useState } from 'react';
import {
  Card,
  Text,
  Elevation,
  Spinner,
  NonIdealState,
  NonIdealStateIconSize,
} from '@blueprintjs/core';

export function ArtifactCard({
  title,
  description,
  className,
  previewImage,
  onClick,
}) {
  const [imageError, setImageError] = useState(null);
  const spinner = () => {
    return <Spinner />;
  };

  return (
    <Card
      className={`portfolio-card ${className}`}
      elevation={Elevation.ZERO}
      onClick={onClick}
    >
      {previewImage && !imageError ? (
        <img
          src={previewImage}
          alt=''
          className={`artifact-preview-image`}
          onLoad={spinner}
          onError={() => {
            setImageError('Error occurred while retrieving the image.');
          }}
        />
      ) : (
        <NonIdealState
          className='artifact-preview-image-not-found'
          icon={imageError ? 'error' : 'issue'}
          iconSize={NonIdealStateIconSize.SMALL}
          title={imageError ? 'Error Loading Image' : 'Image Not Found'}
          description={
            imageError || "Sorry, an image doesn't exist for this item."
          }
        />
      )}
      <br />
      <div className='portfolio-artifact-card-content'>
        <Text className='portfolio-artifact-card-title'>{title}</Text>
        <Text
          tagName='p'
          className='portfolio-artifact-card-description'
          ellipsize={false}
        >
          {description}
        </Text>
      </div>
    </Card>
  );
}

export default ArtifactCard;
