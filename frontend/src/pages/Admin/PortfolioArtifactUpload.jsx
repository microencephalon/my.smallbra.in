// frontend/src/pages/Admin/PortfolioArtifactUpload.jsx
import '@blueprintjs/core/lib/css/blueprint.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FormGroup,
  InputGroup,
  Button,
  HTMLSelect,
  TextArea,
  OverlayToaster,
  Position,
  Intent,
  Card,
  Tabs,
  Tab,
  NonIdealState,
} from '@blueprintjs/core';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
});

function MediaPanel({ media, onMediaChange }) {
  // Separate state for each field in a media object
  const [format, setFormat] = useState(media.format || 'image');
  const [src, setSrc] = useState(media.src || '');
  const [alt, setAlt] = useState(media.alt || '');
  const [caption, setCaption] = useState(media.caption || '');

  // Update the media objet whenever a field changes
  useEffect(() => {
    onMediaChange({ format, src, alt, caption });
  }, [format, src, alt, caption, onMediaChange]);

  return (
    // Replace the following with form groups similar to the ones in the previous example
    <div>
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

function Upload() {
  const [title, setTitle] = useState('');
  const [teaser, setTeaser] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [media, setMedia] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('https://');
  const [repository, setRepository] = useState('https://');
  const [slug, setSlug] = useState('');
  const [visible, setVisible] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/artifact-categories');
        const categoryNames = response.data.map((category) => category.name);
        setCategoriesList(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // Construct payload object
    const payload = {
      title,
      teaser,
      date: formattedDate,
      author,
      description,
      category: isNewCategory
        ? newCategory.toLowerCase()
        : category.toLowerCase(),
      url,
      repository,
      slug: slug.replace(/\s/g, '-').toLowerCase(),
      visible,
      previewImage,
      media,
      tags: tags.split(',').map((tag) => tag.trim()), // assuming tags will be comma-separated
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/artifacts`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        AppToaster.show({
          message: 'Upload successful!',
          intent: Intent.SUCCESS,
        });

        // Reset the form
        setTitle('');
        setDescription('');
        setAuthor('');
        setCategory('');
        setUrl('');
        setRepository('');
        setSlug('');
        setVisible(true);

        // Navigate to the desired path after a successful submission
        navigate('/admin/portfolio');
      }
    } catch (error) {
      AppToaster.show({
        message: `Error uploading portolio artifact: ${error.message}`,
        intent: Intent.DANGER,
      });
      console.error('Error uploading portfolio artifact:', error.message);
      console.error('Error response data:');
      console.error(error.response.data);
    }
  };

  const addMedia = () => {
    const newMedia = [...media, {}];
    setMedia(newMedia);
    setSelectedTabId(newMedia.length - 1); // set selected tab to the new one
  };

  const removeMedia = (index) => {
    setMedia((prevMedia) => {
      const newMedia = prevMedia.filter((_, idx) => idx !== index);
      setSelectedTabId(
        Math.max(0, Math.min(newMedia.length - 1, selectedTabId))
      );
      return newMedia;
    });
  };

  return (
    <div style={{ padding: '20px', width: '50%', minWidth: '478px' }}>
      <form onSubmit={handleSubmit}>
        <FormGroup label='Title' labelFor='title' labelInfo='(required)'>
          <InputGroup
            id='title'
            name='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label='Teaser' labelFor='teaser' labelInfo='(optional)'>
          <TextArea
            id='teaser'
            value={teaser}
            fill={true}
            growVertically={true}
            onChange={(e) => setTeaser(e.target.value)}
            style={{ resize: 'none' }}
          />
        </FormGroup>
        <FormGroup
          label='Description'
          labelFor='description'
          labelInfo='(optional)'
        >
          <TextArea
            id='description'
            value={description}
            fill={true}
            growVertically={true}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: 'none' }}
          />
        </FormGroup>
        <FormGroup label='Author' labelFor='author' labelInfo='(required)'>
          <InputGroup
            id='author'
            name='author'
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label='Category' labelFor='category' labelInfo='(required)'>
          <HTMLSelect
            id='category'
            name='category'
            value={isNewCategory ? 'new' : category}
            onChange={(e) => {
              if (e.target.value === 'new') {
                setIsNewCategory(true);
                setNewCategory('');
              } else {
                setIsNewCategory(false);
                setCategory(e.target.value);
              }
            }}
            required
          >
            <option value='' disabled>
              Select a category
            </option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value='new'>Create new category</option>
          </HTMLSelect>
        </FormGroup>
        {isNewCategory && (
          <FormGroup label='New Category' labelFor='newCategory'>
            <InputGroup
              id='newCategory'
              name='newCategory'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </FormGroup>
        )}
        <FormGroup label='URL' labelFor='url' labelInfo='(optional)'>
          <InputGroup
            id='url'
            name='url'
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label='Repository'
          labelFor='repository'
          labelInfo='(optional)'
        >
          <InputGroup
            id='repository'
            name='repository'
            type='url'
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
          />
        </FormGroup>
        <FormGroup label='Visible' labelFor='visible' labelInfo='(required)'>
          <HTMLSelect
            id='visible'
            name='visible'
            value={visible}
            onChange={(e) => setVisible(e.target.value === 'true')}
          >
            <option value='true'>True</option>
            <option value='false'>False</option>
          </HTMLSelect>
        </FormGroup>
        <FormGroup
          label='Preview Image'
          labelFor='previewImage'
          labelInfo='(optional)'
        >
          <InputGroup
            id='previewImage'
            name='previewImage'
            type='text'
            placeholder='https://example.com/preview-image.png'
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </FormGroup>
        <FormGroup
          label='Tags'
          labelFor='tags'
          labelInfo='(optional, comma-separated)'
        >
          <InputGroup
            id='tags'
            name='tags'
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder='tag1, tag2, tag3...'
          />
        </FormGroup>

        <Card style={{ border: '1px solid gray' }}>
          <Tabs
            className={
              media.length > 0
                ? 'portfolio-upload-tabs-no-nis'
                : 'portfolio-upload-tabs-center-nis'
            }
            id='MediaTabs'
            selectedTabId={selectedTabId}
            onChange={setSelectedTabId}
            vertical={true}
          >
            {media.length > 0 ? (
              media.map((mediaItem, index) => (
                <Tab
                  id={index}
                  key={index}
                  icon={mediaItem.format === 'image' ? 'media' : 'video'}
                  title={
                    <div>
                      {`Media ${index + 1}`}
                      {media.length > 0 && (
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
                        let updatedMedia = [...media];
                        updatedMedia[index] = newMedia;
                        setMedia(updatedMedia);
                      }}
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
                {media.length < 1 && (
                  <Button onClick={addMedia} text='Add Media' />
                )}
              </NonIdealState>
            )}
            {media.length > 0 && (
              <Button
                style={{ marginTop: 20 }}
                text='Add Media'
                onClick={addMedia}
              />
            )}
          </Tabs>
        </Card>
        <br />
        <br />
        <Button intent='primary' type='submit'>
          Upload
        </Button>
      </form>
    </div>
  );
}

export default Upload;
