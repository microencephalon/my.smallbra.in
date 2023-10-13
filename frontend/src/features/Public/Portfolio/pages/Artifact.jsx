// frontend/src/features/Public/Portfolio/pages/Artifact.jsx
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
  Button,
  Dialog as Lightbox,
  Classes,
  ButtonGroup,
  UL,
  Icon,
} from '@blueprintjs/core';

import Common from '../../../../shared/components/common';
import Global from '../../../../shared/components/global';

export const ThemeContext = createContext();

// const baseImgURL = 'http://localhost:8081/storage/images';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function PortfolioArtifact({ context }) {
  const { openSearchBarWithQuery } = context.searchBar;
  const [artifact, setArtifact] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state
  const [tabId, setTabId] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const [responseCode, setResponseCode] = useState(null);

  const has = {
    Repo: !artifact?.repository || artifact.repository === 'N/A' ? false : true,
    Url: !artifact?.url || artifact.url === 'N/A' ? false : true,
    Media: artifact?.media.length > 0,
    Tags: artifact?.tags.length > 0,
  };
  has.NoLinks = has.Repo === false && has.Url === false;

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
        if (error.response) {
          setResponseCode(String(error.response.status)); // Set the status code
        } else {
          setIsNotFound(true);
        }
        console.error(error.message);
      }
    };

    fetchData();
  }, [idFromParams, loading]);

  // To stop it from scrolling to bottom when navigating by way of SearchBar.
  useEffect(() => {
    // Delay of 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    // Cleanup timer if the component is unmounted before the timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isNotFound) {
    return <Global.ErrorCard responseCode={'404'} />;
  }

  if (responseCode) {
    return <Global.ErrorCard responseCode={responseCode} />;
  }

  if ((isFetching && !isNotFound) || loading) {
    return (
      <div className='portfolio-artifact'>
        <Spinner size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  } else {
    return (
      <>
        <ThemeContext.Provider value={value}>
          <div id='padp-details-container'>
            <Card
              interactive={false}
              onClick={undefined}
              className='portfolio-artifact-dp-card'
            >
              <Text tagName='h1' className='portfolio-artifact-dp-title'>
                {artifact.title}
              </Text>
              <Common.CategoryText
                categoryName={artifact.category}
                className='detail-page-categories'
                onCatClick={openSearchBarWithQuery}
              />
              {has.Tags && (
                <Common.TagsGroup
                  array={artifact.tags}
                  className='detail-page-tags'
                  onTagClick={openSearchBarWithQuery}
                />
              )}

              <Text tagName='h2' className='portfolio-artifact-dp-h2'>
                Description
              </Text>
              <Text tagName='p' className='portfolio-artifact-dp-description'>
                {artifact.description}
                {/* artifact.miniDescription */}
              </Text>

              {!has.NoLinks && (
                <Text tagName='h2' className='portfolio-artifact-dp-h2'>
                  Links
                </Text>
              )}

              {!has.NoLinks && (
                <ButtonGroup>
                  <UL className='portfolio-artifact-dp-link-list'>
                    {has.Repo && (
                      <li>
                        <Link
                          to={artifact.repository}
                          target='_blank'
                          className='portfolio-artifact-dp-link'
                        >
                          <Button
                            id='padp-btn-link-repo'
                            outlined={true}
                            icon='git-repo'
                            text={artifact.repository}
                            className='portfolio-artifact-dp-link'
                          />
                        </Link>
                      </li>
                    )}
                    {has.Url && (
                      <li>
                        <Link
                          to={artifact.url}
                          target='_blank'
                          className='portfolio-artifact-dp-link'
                        >
                          <Button
                            id='padp-btn-link-url'
                            outlined={true}
                            icon='globe-network'
                            text={artifact.url}
                            className='portfolio-artifact-dp-link padp-btn-link'
                          ></Button>
                        </Link>
                      </li>
                    )}
                  </UL>
                </ButtonGroup>
              )}
              {has.Media && <h2>Previews</h2>}
              {has.Media && (
                <div className='portfolio-artifact-dp-previews-container'>
                  <Tabs
                    onChange={handleTabChange}
                    selectedTabId={tabId}
                    defaultSelectedTabId={'1'}
                    vertical={true}
                    large={true}
                    animate={true}
                  >
                    {!loading &&
                      artifact &&
                      has.Media &&
                      artifact.media.map((mediaItem, index) =>
                        MediaTab({ mediaItem: mediaItem, index: index })
                      )}
                  </Tabs>
                </div>
              )}
            </Card>
            {/* <PortfolioContent /> */}
          </div>
          {has.Media && (
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
          )}
        </ThemeContext.Provider>
      </>
    );
  }
}

export default PortfolioArtifact;
