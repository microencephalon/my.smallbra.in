// frontend/src/pages/Portfolio/PortfolioArtifact.jsx
import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Spinner,
  SpinnerSize,
  Tabs,
  Tab,
  NonIdealState,
  NonIdealStateIconSize,
  Card,
  Text,
  Tag,
  Button,
  Dialog as Lightbox,
  Classes,
  ButtonGroup,
  UL,
  Icon,
} from '@blueprintjs/core';

// TODO: Need to set up artifact format page

export const ThemeContext = createContext();

// const baseImgURL = 'http://localhost:8081/storage/images';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function PortoflioArtifact() {
  const [artifact, setArtifact] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state
  const [tabId, setTabId] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);

  const handleLightbox = (open, index = lightboxCurrentIndex) => {
    setIsLightboxOpen(open);
    setLightboxCurrentIndex(index);
  };

  const handleTabChange = (newTabId) => {
    setTabId(newTabId);
    setLightboxCurrentIndex(parseInt(newTabId.split('-')[1]));
  };

  const value = {
    isDark,
    setIsDark,
  };

  const { id: idFromParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/artifacts/${idFromParams}`);
        if (response.status === 200) {
          setIsFetching(false);
          if (response.data.media.length > 0) {
            setTabId('media-0');
          }
        } else {
          setIsNotFound(true);
        }
        setArtifact(response.data);
        setLoading(false);
      } catch (error) {
        setIsNotFound(true);
        console.error(error.message);
      }
    };

    fetchData();
  }, [idFromParams, loading]);

  // Modify the MediaTab component
  const MediaTab = ({ mediaItem, index }) => {
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
                    className='portfolio-artifact-dp-media-img'
                    src={mediaItem.src}
                    alt={mediaItem.alt}
                    width={imgWidth}
                    height={imgHeight}
                    onClick={() => handleLightbox(true, index)}
                  />

                  <figcaption className='portfolio-artifact-dp-caption'>
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
              // TODO: Set auto height for iframe
              <figure>
                <center>
                  <iframe
                    className='portfolio-artifact-dp-media-iframe'
                    src={mediaItem.src}
                    title='YouTube video player'
                    frameborder={0}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    crossOrigin='anonymous'
                  />
                  <figcaption className='portfolio-artifact-dp-caption'>
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
                className='artifact-preview-image-not-found'
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

  const TagsGroup = (array) => {
    return array.map((tag, index) => (
      <Tag
        key={`tag-${index}`}
        onClick={undefined}
        onRemove={undefined}
        interactive={false}
        minimal={true}
        large={true}
        className='portfolio-artifact-dp-tags'
      >
        {tag}
      </Tag>
    ));
  };

  if (isFetching && !isNotFound) {
    return <div>Loading...</div>;
  }

  if (isNotFound) {
    return <div>404 Not Found</div>;
  }

  if (loading) {
    return (
      <div className='portfolio-artifact'>
        <Spinner size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  } else {
    return (
      <>
        <ThemeContext.Provider value={value}>
          <div>
            <br />
            <br />
            <br />
            <br />
            <Card
              interactive={false}
              onClick={undefined}
              className='portfolio-artifact-dp-card'
            >
              <Text tagName='span' className='portfolio-artifact-dp-category'>
                {artifact.category}
              </Text>
              <Text tagName='h1' className='portfolio-artifact-dp-title'>
                {artifact.title}
              </Text>
              {TagsGroup(artifact.tags)}
              <Text tagName='h2' className='portfolio-artifact-dp-h2'>
                Description
              </Text>
              <Text tagName='p' className='portfolio-artifact-dp-description'>
                {artifact.description}
                {/* artifact.miniDescription */}
              </Text>
              <Text tagName='h2' className='portfolio-artifact-dp-h2'>
                Links
              </Text>
              <ButtonGroup>
                <UL className='portfolio-artifact-dp-link-list'>
                  <li>
                    <Link
                      to={artifact.repository}
                      target='_blank'
                      className='portfolio-artifact-dp-link'
                    >
                      <Button
                        outlined={true}
                        icon='git-repo'
                        text={artifact.repository}
                        style={{ marginRight: '5px' }}
                        className='portfolio-artifact-dp-link'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={artifact.url}
                      target='_blank'
                      className='portfolio-artifact-dp-link'
                    >
                      <Button
                        outlined={true}
                        icon='globe-network'
                        text={artifact.url}
                        style={{ marginRight: '5px' }}
                        className='portfolio-artifact-dp-link'
                      ></Button>
                    </Link>
                  </li>
                </UL>
              </ButtonGroup>
              <h2>Previews</h2>
              <div
                style={{
                  background: 'whitesmoke',
                  padding: '20px',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  width: '60%',
                }}
              >
                <Tabs
                  id='artifactScreenshotsTabs'
                  onChange={handleTabChange}
                  selectedTabId={tabId}
                  defaultSelectedTabId={'1'}
                  vertical={true}
                  large={true}
                  animate={true}
                >
                  {!loading && artifact && artifact.media.length > 0 ? (
                    artifact.media.map((mediaItem, index) =>
                      MediaTab({ mediaItem: mediaItem, index: index })
                    )
                  ) : (
                    <NonIdealState
                      className='artifact-preview-image-not-found'
                      icon='issue'
                      iconSize={NonIdealStateIconSize.SMALL}
                      title='No Screenshots'
                      description='Sorry, there are no screenshots for this artifact.'
                    />
                  )}
                </Tabs>
              </div>
            </Card>
            {/* <PortfolioContent /> */}
          </div>
          <Lightbox
            className={
              isDark ? 'bp5-dark artifact-lightbox' : 'artifact-lightbox'
            }
            onClose={() => handleLightbox(false)}
            isOpen={isLightboxOpen}
          >
            <div
              className={`${Classes.DIALOG_HEADER} artifact-lightbox-header`}
            >
              <span className='artifact-lightbox-header-title'>
                {artifact.media[lightboxCurrentIndex].caption}
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
                src={artifact.media[lightboxCurrentIndex].src}
                alt='Dialog View'
              />
            </div>
          </Lightbox>
        </ThemeContext.Provider>
      </>
    );
  }
}

export default PortoflioArtifact;
