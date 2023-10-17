import {
  Tab,
  NonIdealState,
  NonIdealStateIconSize,
  Button,
  Tabs,
  Icon,
  Classes,
} from '@blueprintjs/core';

export const MediaTab = ({ mediaItem, index, onImageClick }) => {
  const imgWidth = 'auto';
  const imgHeight = 'auto';

  switch (mediaItem.format) {
    case 'image':
      return (
        <Tab
          id={`media-${index}`}
          title={index + 1}
          icon='media'
          panel={
            <figure>
              <center>
                <img
                  className='artifact-media-img'
                  src={mediaItem.src}
                  alt={mediaItem.alt}
                  width={imgWidth}
                  height={imgHeight}
                  onClick={() => onImageClick(true, index)}
                />

                <figcaption className='artifact-media-caption'>
                  {mediaItem.caption}
                </figcaption>
              </center>
            </figure>
          }
        />
      );
    case 'video':
      return (
        <Tab
          id={`media-${index}`}
          title={index + 1}
          icon='video'
          panel={
            <figure>
              <center>
                <iframe
                  className='artifact-media-iframe'
                  src={mediaItem.src}
                  title='YouTube video player'
                  frameBorder={0}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  crossOrigin='anonymous'
                />
                <figcaption className='artifact-media-caption'>
                  {mediaItem.caption}
                </figcaption>
              </center>
            </figure>
          }
        />
      );
    default:
      return (
        <Tab
          id={`media-${index}`}
          title={index + 1}
          icon='error'
          panel={
            <NonIdealState
              className='portfolio-img-not-found'
              icon='error'
              iconSize={NonIdealStateIconSize.SMALL}
              title='Media Not Found'
              description='Sorry, the media resource cannot be found.'
            />
          }
        />
      );
  }
};

export const PreviewsHeader = () => {
  return <h2>Previews</h2>;
};

export const PreviewTabs = ({ children, onChange, selectedTabId }) => {
  return (
    <div id='artifact-preview-container'>
      <Tabs
        onChange={onChange}
        selectedTabId={selectedTabId}
        defaultSelectedTabId={'1'}
        vertical={true}
        large={true}
        animate={true}
      >
        {children}
      </Tabs>
    </div>
  );
};

export const PreviewMediaLightbox = ({ kit, item }) => {
  const { Lightbox, handleLightbox, isOpen, currentIndex } = kit;
  return (
    <Lightbox
      className='artifact-lightbox'
      onClose={() => handleLightbox(false)}
      isOpen={isOpen}
    >
      <div className={`${Classes.DIALOG_HEADER} artifact-lightbox-header`}>
        <span className='artifact-lightbox-header-title'>
          {item.media[currentIndex].caption}
        </span>
        <Button
          minimal={true}
          icon={<Icon icon='cross' color='white' />}
          onClick={() => handleLightbox(false)}
        ></Button>
      </div>
      <div
        className={`${Classes.DIALOG_CONTAINER} artifact-lightbox-container`}
      >
        <img
          className='artifact-lightbox-img'
          src={item.media[currentIndex].src}
          alt='Dialog View'
        />
      </div>
    </Lightbox>
  );
};

export const Previews = {
  Tab: MediaTab,
  Header: PreviewsHeader,
  Tabs: PreviewTabs,
  Lightbox: PreviewMediaLightbox,
};
