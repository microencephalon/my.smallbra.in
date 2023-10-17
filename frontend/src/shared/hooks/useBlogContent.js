// frontend/src/shared/hooks/useBlogContent.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const storageBaseUrl = 'http://localhost:8081';
const API_URL = process.env.REACT_APP_API_URL;

const useBlogContent = (idFromParams, isSearchBarOpen) => {
  const [postContent, setPostContent] = useState('');
  const [postInfo, setPostInfo] = useState({
    category: '',
    title: '',
    dateCreated: '',
    author: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/posts/${idFromParams}`
        );
        const post = response.data;
        const mdFileURL = `${storageBaseUrl}${post.content}`;

        const mdResponse = await axios.get(mdFileURL);
        let mdContent = mdResponse.data;

        // Remove the h1 from mdContent and any subsequent empty lines
        const lines = mdContent.split('\n');
        if (lines[0].startsWith('# ') && !lines[0].startsWith('##')) {
          lines.shift();
          while (lines.length > 0 && lines[0] === '') {
            lines.shift();
          }
          mdContent = lines.join('\n');
        }

        const highlightedMdContent = mdContent.replace(
          /==([^=]+)==/g,
          '<mark>$1</mark>'
        );
        setPostContent(highlightedMdContent);

        const formattedDate = new Date(post.dateCreated).toLocaleDateString(
          'en-US',
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }
        );

        setPostInfo({
          category: post.category,
          title: post.title,
          dateCreated: formattedDate,
          author: post.author,
          tags: post.tags,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idFromParams, isSearchBarOpen]);

  return { postContent, postInfo, loading };
};

export default useBlogContent;
