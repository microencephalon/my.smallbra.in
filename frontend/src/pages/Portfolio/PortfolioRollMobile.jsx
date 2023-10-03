// frontend/src/pages/Portfolio/PortfolioRoll.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtifactCard from '../../components/portfolio/PortfolioArtifactCard';
import axios from 'axios';
import { Card, Elevation, Text, Button, Icon } from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const PortfolioRoll = () => {
  const navigate = useNavigate();
  const fadeInRef = useRef(null);

  const [artifacts, setArtifacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const getInitialArtifacts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/artifacts?page=1`);
      const { artifacts, pages } = response.data;

      const visibleArtifacts = artifacts
        .filter((artifact) => artifact.visible !== false)
        .map((artifact) => ({ data: artifact, isLoading: true }));
      visibleArtifacts.sort(
        (a, b) => new Date(b.data.dateCreated) - new Date(a.data.dateCreated)
      );

      setArtifacts(visibleArtifacts);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching initial artifacts:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setArtifacts((prevArtifacts) =>
          prevArtifacts.map((artifactObj) => ({
            ...artifactObj,
            isLoading: false,
          }))
        );
      }, 250);
    }
  }, []);

  const loadMoreArtifacts = useCallback(async () => {
    if (loading || page >= totalPages) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(`/api/artifacts?page=${nextPage}`);
      const { artifacts: newArtifacts } = response.data;

      const visibleArtifacts = newArtifacts
        .filter((artifact) => artifact.visible !== false)
        .map((artifact) => ({ data: artifact, isLoading: true }));
      setArtifacts((prevArtifacts) => [...prevArtifacts, ...visibleArtifacts]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching more artifacts:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setArtifacts((prevArtifacts) =>
          prevArtifacts.map((artifactObj) => ({
            ...artifactObj,
            isLoading: false,
          }))
        );
      }, 500);
    }
  }, [loading, page, totalPages]);

  const handleLoadMore = () => {
    loadMoreArtifacts();
    if (fadeInRef.current) {
      clearTimeout(fadeInRef.current); // Clear any existing timeout
    }
    fadeInRef.current = setTimeout(() => {
      setArtifacts((prevArtifacts) =>
        prevArtifacts.map((artifactObj) => ({
          ...artifactObj,
          isLoading: false,
        }))
      );
    }, 500); // Set a timeout to remove the skeleton class and add the fade-in class
  };

  const renderCard = (artifactObj, idx) => (
    <div
      style={{ display: 'flex', flexDirection: 'row', paddingBottom: '5px' }}
      key={artifactObj.data._id}
      className={`${artifactObj.isLoading ? '' : 'fade-in-card'}`}
    >
      <ArtifactCard
        className={`
          ${
            idx !== artifacts.length - 1
              ? 'portfolio-artifact-card'
              : 'portfolio-artifact-card portfolio-artifact-card-last'
          }
          ${artifactObj.isLoading ? 'bp5-skeleton' : ''}
        `}
        date={new Date(artifactObj.data.dateCreated).toLocaleDateString()}
        title={artifactObj.data.title}
        description={artifactObj.data.teaser}
        previewImage={
          !artifactObj.data.previewImage || artifactObj.data.previewImage === ''
            ? false
            : artifactObj.data.previewImage
        }
        onClick={() =>
          navigate(
            `/portfolio/${artifactObj.data.slug}/${artifactObj.data._id}`
          )
        }
      ></ArtifactCard>
    </div>
  );

  useEffect(() => {
    getInitialArtifacts();
  }, [getInitialArtifacts]);

  useEffect(() => {
    if (fadeInRef.current) {
      clearTimeout(fadeInRef.current); // Clear any existing timeout when the component unmounts
    }
  }, []);

  return (
    <div style={{ paddingTop: '60px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
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
        {artifacts.map((artifact, idx) => (
          <React.Fragment key={artifact.data._id}>
            {renderCard(artifact, idx)}
          </React.Fragment>
        ))}
        {page < totalPages && (
          <Button
            className='load-more-button'
            minimal={true}
            large={true}
            onClick={handleLoadMore}
            icon={
              <Icon
                icon='caret-down'
                size='1.5em'
                color='#141414'
                large={true}
              />
            }
            disabled={loading}
          />
        )}
        <div className='card-footer-bottom-space'>&nbsp;</div>
      </div>
    </div>
  );
};

export default PortfolioRoll;
