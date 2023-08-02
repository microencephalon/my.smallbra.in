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
  const spinner = () => {
    return <Spinner />;
  };
  return (
    <Card
      className={`portfolio-card ${className}`}
      elevation={Elevation.ZERO}
      onClick={onClick}
    >
      {previewImage ? (
        <img
          // src={splash}
          src={previewImage}
          alt=''
          className={`artifact-preview-image`}
          onLoad={spinner}
        />
      ) : (
        <NonIdealState
          className='artifact-preview-image-not-found'
          icon='issue'
          iconSize={NonIdealStateIconSize.SMALL}
          title='Image Not Found'
          description="Sorry, an image doesn't exist or it could not be retrieved."
        />
      )}

      <br />
      <Text className='portfolio-artifact-card-title'>{title}</Text>
      <Text
        tagName='p'
        className='portfolio-artifact-card-description'
        ellipsize={false}
      >
        {description}
      </Text>
    </Card>
  );
}

export default ArtifactCard;
