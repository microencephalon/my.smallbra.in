// frontend/src/features/Public/Portfolio/pages/Artifact.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Dialog } from '@blueprintjs/core';

import Common from '../../../../shared/components/common';
import Global from '../../../../shared/components/global';
import Portfolio from '../components';
import { useFetchData } from '../../../../shared/hooks';

const Artifact = Portfolio.Artifact;

// const baseImgURL = 'http://localhost:8081/storage/images';

function PortfolioArtifact({ context }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);

  const { id: idFromParams } = useParams();

  const { openSearchBarWithQuery } = context.searchBar;

  const {
    artifact,
    isFetching,
    isNotFound,
    loading,
    tabId,
    setTabId,
    responseCode,
  } = useFetchData.portfolio.artifact(idFromParams);

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

  if (isNotFound) {
    return <Global.ErrorCard responseCode={'404'} />;
  }

  if (responseCode) {
    return <Global.ErrorCard responseCode={responseCode} />;
  }

  if ((isFetching && !isNotFound) || loading) {
    return <Artifact.Spinner />;
  } else {
    return (
      <>
        <Artifact.Container>
          <header>
            <Artifact.Text.Title>{artifact.title}</Artifact.Text.Title>
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
          </header>

          <Artifact.Text.Description>
            {artifact.description}
          </Artifact.Text.Description>

          {!has.NoLinks && <Artifact.Links.Header>Links</Artifact.Links.Header>}

          {/* Artifact Links */}
          {!has.NoLinks && (
            <Artifact.Links.Group>
              {has.Repo && (
                <Artifact.Link
                  id='artifact-repo-link'
                  icon='git-repo'
                  inlink={artifact.repository}
                />
              )}
              {has.Url && (
                <Artifact.Link
                  id='artifact-url-link'
                  icon='globe-network'
                  inlink={artifact.url}
                />
              )}
            </Artifact.Links.Group>
          )}

          {/* Artifact Preview Media */}
          {has.Media && <Artifact.Previews.Header />}
          {has.Media && (
            <Artifact.Previews.Tabs
              onChange={handleTabChange}
              selectedTabId={tabId}
            >
              {!loading &&
                artifact &&
                has.Media &&
                artifact.media.map((mediaItem, index) =>
                  Artifact.Previews.Tab({
                    mediaItem: mediaItem,
                    index: index,
                    onImageClick: handleLightbox,
                  })
                )}
            </Artifact.Previews.Tabs>
          )}
        </Artifact.Container>

        {has.Media && (
          <Artifact.Previews.Lightbox
            item={artifact}
            kit={{
              Lightbox: Dialog,
              handleLightbox: handleLightbox,
              isOpen: isLightboxOpen,
              currentIndex: lightboxCurrentIndex,
            }}
          />
        )}
      </>
    );
  }
}

export default PortfolioArtifact;
