// frontend/src/pages/Blog/Blogroll.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtifactCard from '../../components/portfolio/PortfolioArtifactCard';
import axios from 'axios';
import { Card, Elevation, Text } from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Blogroll = () => {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [hasMoreArtifacts, setHasMoreArtifacts] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreRef = useRef();

  const getArtifacts = useCallback(async () => {
    const response = await axios.get(`/api/artifacts?page=${page}`);
    if (response.data.length > 0) {
      const visibleArtifacts = await Promise.all(
        response.data
          .filter((artifact) => artifact.visible !== false)
          .map(async (artifact) => {
            if (artifact.previewImage) {
              try {
                const imageResponse = await axios.get(artifact.previewImage, {
                  responseType: 'blob',
                });
                artifact.previewImage = imageResponse.headers[
                  'content-type'
                ].startsWith('image/')
                  ? artifact.previewImage
                  : false;
              } catch (error) {
                artifact.previewImage = false;
              }
            }
            return artifact;
          })
      );
      setArtifacts((prevArtifacts) => {
        const lastArtifact = prevArtifacts[prevArtifacts.length - 1];
        const lastNewArtifact = visibleArtifacts[visibleArtifacts.length - 1];
        if (
          lastArtifact &&
          lastNewArtifact &&
          lastArtifact.id === lastNewArtifact.id
        ) {
          setHasMoreArtifacts(false);
          return prevArtifacts;
        }
        return [...prevArtifacts, ...visibleArtifacts];
      });
    } else {
      setHasMoreArtifacts(false);
    }
  }, [page]);

  useEffect(() => {
    if (hasMoreArtifacts) {
      getArtifacts();
    }
  }, [page, getArtifacts, hasMoreArtifacts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true && hasMoreArtifacts) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, [loadMoreRef, hasMoreArtifacts]);

  const sliceNum = Infinity;

  const renderCard = (artifact, idx) => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* <Link
        style={{ textDecoration: 'none' }}
        to={`/portfolio/${post.slug}/${post._id}`}
      > */}
      <ArtifactCard
        className={
          idx !== sliceNum - 1
            ? 'portfolio-artifact-card'
            : 'portfolio-artifact-card portfolio-artifact-card-last'
        }
        date={new Date(artifact.dateCreated).toLocaleDateString()}
        title={artifact.title}
        description={artifact.teaser}
        previewImage={
          !artifact.previewImage || artifact.previewImage === ''
            ? false
            : artifact.previewImage
        }
        onClick={() => navigate(`/portfolio/${artifact.slug}/${artifact._id}`)}
      ></ArtifactCard>
      {/* </Link> */}
    </div>
  );

  return (
    <div style={{ paddingTop: '60px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          maxWidth: 332,
        }}
      >
        <Card
          className='portfolio-card portfolio-card-header'
          elevation={Elevation.ZERO}
        >
          <Text className='portfolio-artifact-card-title'>Artifacts</Text>
        </Card>
        {artifacts.slice(0, sliceNum).map((post, idx) => (
          <>{renderCard(post, idx)}</>
        ))}
        <div className='card-footer-bottom-space'>&nbsp;</div>
      </div>

      {hasMoreArtifacts && <div ref={loadMoreRef}>Load More...</div>}
    </div>
  );
};

export default Blogroll;
