// frontend/src/pages/Admin/PortolioArtifactEdit.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormGroup,
  InputGroup,
  Button,
  TextArea,
  OverlayToaster,
  Position,
  Intent,
  Switch,
  Card,
  Tabs,
  Tab,
  HTMLSelect,
  NonIdealState,
  Dialog as Lightbox,
  Classes,
  Icon,
} from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
});

function MediaPanel({ media, onMediaChange, handleLightbox, index }) {
  // Separate state for each field in a media object
  const [format, setFormat] = useState(media.format || 'image');
  const [src, setSrc] = useState(media.src || '');
  const [alt, setAlt] = useState(media.alt || '');
  const [caption, setCaption] = useState(media.caption || '');

  // Update the media object whenever a field changes
  useEffect(() => {
    onMediaChange({ format, src, alt, caption });
  }, [format, src, alt, caption, onMediaChange]);

  return (
    <div style={{ width: 'auto' }}>
      <FormGroup label='Format' labelFor='media-format' labelinfo='(required)'>
        <HTMLSelect
          id='media-format'
          name='media-format'
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          required
        >
          <option value='image'>image</option>
          <option value='video'>video</option>
        </HTMLSelect>
      </FormGroup>
      <FormGroup
        label='Source URL'
        labelFor='media-format'
        labelinfo='(required)'
      >
        <InputGroup
          id='media-src'
          name='media-src'
          type='text'
          value={src}
          placeholder={
            format === 'image'
              ? 'https://example.com/image.png'
              : 'https://www.youtube.com/embed/id'
          }
          onChange={(e) => setSrc(e.target.value)}
          required
        />
        {media.format === 'image' && (
          <figure>
            <img
              className='artifact-media-img'
              src={media.src}
              alt={media.alt}
              width='200px'
              height='auto'
              loading='lazy'
              onClick={() => handleLightbox(true, index)}
            />
          </figure>
        )}
        {media.format === 'video' && (
          <figure>
            <iframe
              width='300px'
              height='168.75px'
              src={media.src}
              title='YouTube video player'
              frameBorder={0}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              crossOrigin='anonymous'
            />
          </figure>
        )}
      </FormGroup>
      <FormGroup
        label='<alt> Text'
        labelFor='media-alt'
        labelinfo='(optional)'
        disabled={format === 'video' ? true : false}
      >
        <InputGroup
          id='media-alt'
          name='media-alt'
          type='text'
          value={format === 'image' ? alt : ''}
          disabled={format === 'video' ? true : false}
          onChange={(e) => setAlt(e.target.value)}
        />
      </FormGroup>
      <FormGroup
        label='Media Caption'
        labelFor='media-caption'
        labelinfo='(optional)'
      >
        <InputGroup
          id='media-caption'
          name='media-caption'
          type='text'
          value={caption}
          placeholder={`Insert caption for ${
            format === 'image' ? 'image' : 'video'
          } here.`}
          onChange={(e) => setCaption(e.target.value)}
        />
      </FormGroup>
    </div>
  );
}

const Edit = ({ id, onUpdate }) => {
  const [artifact, setArtifact] = useState(null);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(null);

  const handleLightbox = (open, index = lightboxCurrentIndex) => {
    setIsLightboxOpen(open);
    setLightboxCurrentIndex(index);
  };

  const handleTabChange = (newTabId) => {
    setSelectedTabId(newTabId);
    setLightboxCurrentIndex(parseInt(newTabId));
  };

  const addMedia = () => {
    const newMedia = {
      format: 'image',
      src: '',
      alt: '',
      caption: '',
    };
    setArtifact({ ...artifact, media: [...artifact.media, newMedia] });
    setSelectedTabId(artifact.media.length); // Switch to the new tab
  };

  const removeMedia = (index) => {
    setArtifact((prevArtifact) => {
      const newMedia = prevArtifact.media.filter((_, idx) => idx !== index);
      setSelectedTabId(
        Math.max(0, Math.min(newMedia.length - 1, selectedTabId))
      );
      return { ...prevArtifact, media: newMedia };
    });
  };

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await axios.get(`/api/artifacts/${id}`);
        setArtifact(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtifact();
  }, [id, refreshCount]);

  const handlePostUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/artifacts/${id}`,
        { ...artifact, media: artifact.media },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      AppToaster.show({
        message: 'Update successful!',
        isCloseButtonShown: false,
        intent: Intent.SUCCESS,
        timeout: 2500,
      });
      setRefreshCount(refreshCount + 1);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      AppToaster.show({
        message: 'Error updating portfolio artifact!',
        isCloseButtonShown: false,
        intent: Intent.DANGER,
        timeout: 2500,
      });
      console.error('Error updating portfolio artifact:', error);
    }
  };

  if (!artifact) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px', overflowY: 'auto' }}>
      <FormGroup label='Title' labelFor='title' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-title'
          value={artifact.title}
          onChange={(e) => setArtifact({ ...artifact, title: e.target.value })}
        />
      </FormGroup>
      <FormGroup label='Teaser' labelFor='teaser' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-teaser'
          value={artifact.teaser}
          onChange={(e) => setArtifact({ ...artifact, teaser: e.target.value })}
        />
      </FormGroup>
      <FormGroup
        label='Description'
        labelFor='description'
        style={{ width: '90%' }}
      >
        <TextArea
          id='artifact-description'
          value={artifact.description}
          fill={true}
          autoResize={true}
          style={{ resize: 'none' }}
          onChange={(e) =>
            setArtifact({ ...artifact, description: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup label='Author' labelFor='author' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-author'
          value={artifact.author}
          onChange={(e) => setArtifact({ ...artifact, author: e.target.value })}
        />
      </FormGroup>

      <FormGroup label='Category' labelFor='category' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-category'
          value={artifact.category}
          onChange={(e) =>
            setArtifact({ ...artifact, category: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup label='URL' labelFor='url' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-url'
          value={artifact.url}
          onChange={(e) => setArtifact({ ...artifact, url: e.target.value })}
        />
      </FormGroup>
      <FormGroup
        label='Repository'
        labelFor='repository'
        style={{ width: '90%' }}
      >
        <InputGroup
          id='artifact-repo'
          value={artifact.repository}
          onChange={(e) =>
            setArtifact({ ...artifact, repository: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup label='Visible:' labelFor='visible' style={{ width: '90%' }}>
        <Switch
          id='visible'
          label={artifact.visible ? 'True' : 'False'}
          checked={artifact.visible}
          onChange={(e) =>
            setArtifact({ ...artifact, visible: e.target.checked })
          }
        />
      </FormGroup>
      <FormGroup
        label='Preview Image'
        labelFor='preview-image'
        style={{ width: '90%' }}
      >
        <InputGroup
          id='portfolio-card-preview-img'
          value={artifact.previewImage}
          onChange={(e) =>
            setArtifact({ ...artifact, previewImage: e.target.value })
          }
        />
        <br />
        {artifact.previewImage && !imageError ? (
          <figure>
            <img
              src={artifact.previewImage}
              alt='Preview Thumbnail'
              width='200px'
              height='auto'
              style={{ border: '1px solid #CCCCCC', borderRadius: '3px' }}
              onError={(e) => {
                setImageError('Error occurred while retrieving the image.');
              }}
            />
          </figure>
        ) : (
          <NonIdealState
            icon='media'
            title={
              imageError
                ? 'Error Loading Thumbnail'
                : 'No Preview Thumbnail Found'
            }
            description={imageError || 'Please add a preview thumbnail.'}
          >
            {/* Add your action button if needed */}
          </NonIdealState>
        )}
      </FormGroup>
      <FormGroup label='Tags' labelFor='tags' style={{ width: '90%' }}>
        <InputGroup
          id='artifact-tags'
          value={artifact.tags}
          onChange={(e) =>
            setArtifact({
              ...artifact,
              tags: e.target.value.split(',').map((tag) => tag.trim()),
            })
          }
        />
      </FormGroup>
      <Card
        style={{
          border: '1px solid #CCCCCC',
          width: '90%',
          marginBottom: '20px',
          overflow: 'auto',
        }}
      >
        <Tabs
          className={
            artifact.media.length > 0
              ? 'portfolio-upload-tabs-edit-no-nis'
              : 'portfolio-upload-tabs-edit-center-nis'
          }
          id='MediaTabs'
          onChange={handleTabChange}
          selectedTabId={selectedTabId}
          defaultSelectedTabId={'1'}
          vertical={true}
          animate={true}
        >
          {artifact.media.length > 0 ? (
            artifact.media.map((mediaItem, index) => (
              <Tab
                id={index}
                key={index}
                icon={mediaItem.format === 'image' ? 'media' : 'video'}
                title={
                  <div>
                    {`${index + 1}`}
                    {artifact.media.length > 0 && (
                      <Button
                        small
                        minimal={true}
                        icon='cross'
                        onClick={() => removeMedia(index)}
                      />
                    )}
                  </div>
                }
                panel={
                  <MediaPanel
                    media={mediaItem}
                    onMediaChange={(newMedia) => {
                      let updatedMedia = [...artifact.media];
                      updatedMedia[index] = newMedia;
                      setArtifact({ ...artifact, media: updatedMedia });
                    }}
                    handleLightbox={handleLightbox}
                    index={index}
                  />
                }
              />
            ))
          ) : (
            <NonIdealState
              icon='media'
              title='No Media Items Found'
              description='Please add some media items.'
            >
              {artifact.media.length < 1 && (
                <Button onClick={addMedia} text='Add Media' />
              )}
            </NonIdealState>
          )}
        </Tabs>
        {artifact.media.length > 0 && (
          <Button onClick={addMedia} text='Add Media' />
        )}
      </Card>
      <FormGroup label='Slug' labelFor='slug' style={{ width: '90%' }}>
        <InputGroup id='artifact-slug' disabled={true} value={artifact.slug} />
      </FormGroup>

      <FormGroup
        label='Date Created:'
        labelFor='dateCreated'
        style={{ width: '90%' }}
      >
        <InputGroup
          id='artifact-dateCreated'
          disabled={true}
          value={new Date(artifact.dateCreated).toLocaleDateString()}
        />
      </FormGroup>

      <Button onClick={handlePostUpdate}>Save</Button>
      <Lightbox
        className='artifact-lightbox'
        onClose={() => handleLightbox(false)}
        isOpen={isLightboxOpen}
      >
        <div className={`${Classes.DIALOG_HEADER} artifact-lightbox-header`}>
          <span className='artifact-lightbox-header-title'>
            {artifact?.media && artifact.media[lightboxCurrentIndex]?.caption
              ? artifact.media[lightboxCurrentIndex].caption
              : ''}
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
            src={
              artifact?.media && artifact.media[lightboxCurrentIndex]?.src
                ? artifact.media[lightboxCurrentIndex].src
                : ''
            }
            alt='Dialog View'
          />
        </div>
      </Lightbox>
    </div>
  );
};

export default Edit;
