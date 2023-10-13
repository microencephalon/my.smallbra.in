// frontend/src/features/Public/Blog/components/Content.jsx
import { useState, useEffect, useMemo, createElement } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';

import { HTMLTable, Spinner, SpinnerSize } from '@blueprintjs/core';

import CodeBlock from '../components/CodeBlock';
import Common from '../../../../shared/components/common';

const storageBaseUrl = 'http://localhost:8081';
const API_URL = process.env.REACT_APP_API_URL;

const BlogContent = ({ context }) => {
  const { openSearchBarWithQuery, open: isSearchBarOpen } = context.searchBar;
  const [postContent, setPostContent] = useState('');
  const [postInfo, setPostInfo] = useState({
    category: '',
    title: '',
    dateCreated: '',
    author: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true); // Set initial loading state

  // In case URL is visited directly
  const { id: idFromParams } = useParams();

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
          lines.shift(); // Remove the first line
          while (lines.length > 0 && lines[0] === '') {
            lines.shift(); // Remove empty lines
          }
          mdContent = lines.join('\n'); // Rejoin the lines into a single string
        }

        const highlightedMdContent = mdContent.replace(
          /==([^=]+)==/g,
          '<mark">$1</mark>'
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
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idFromParams, isSearchBarOpen]);

  const hyphenateString = useMemo(() => {
    return (str) => str.toLowerCase().trim().replace(/\s+/g, '-');
  }, []);

  const iteratePropsChildren = (props) => {
    let textArray = [];
    const handleChildren = (newArray, [key, value]) => {
      if (/^\d/.test(key)) {
        newArray.push(iteratePropsChildren([value]));
      }
      return newArray;
    };
    for (let i = 0; i < props.length; i++) {
      if (typeof props[i] === 'string') {
        textArray.push(props[i].trim());
      } else if (props[i].props && props[i].props.children) {
        const children = props[i].props.children;
        textArray = Object.entries(children).reduce(handleChildren, textArray);
      }
    }
    textArray = textArray.flat();
    let regex = /\{#([\w\s-]+)\}/;
    if (regex.test(textArray[textArray.length - 1])) {
      let customId = textArray
        .pop()
        .replace(/\{#(\S+)\}/, '$1')
        .replace(/\s+/g, '-')
        .toLowerCase();
      return customId;
    }
    let textString = textArray
      .join(' ')
      .replace(/[^\w\s]/g, ' ') // replace non-word characters with spaces
      .replace(/\b\d+\b/g, '') // remove numbers
      .trim()
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .toLowerCase();
    return textString;
  };

  const MarkdownHeader = (level) => (props) => {
    const { children } = props;
    let customId;
    const regex = /\{#(\S+)\}/;
    if (children.length < 2 && !children[0].type) {
      const match = regex.exec(children[0]);
      if (!match) return createElement(`h${level}`, props, children);
      customId = match[1];
      const text = children[0].replace(/\s*{#[^}]+}/, '').trim();
      return createElement(
        `h${level}`,
        { id: hyphenateString(customId), className: `blog-h${level}` },
        text
      );
    } else {
      customId = iteratePropsChildren(children);
      if (
        typeof children[children.length - 1] === 'string' &&
        regex.exec(children[children.length - 1])
      ) {
        return createElement(
          `h${level}`,
          { id: customId, className: `blog-h${level}` },
          [...children.slice(0, -1)]
        );
      } else {
        return createElement(
          `h${level}`,
          { id: customId, className: `blog-h${level}` },
          children
        );
      }
    }
  };

  // Firefox Support for any `@supports not (-moz-appearance: none) {}` block in `blog.css`
  const isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      if (link.querySelector('sup')) {
        link.style.setProperty('text-decoration-line', 'none', 'important');
      }
    });

    // Fix indentation problem with task lists
    const checkboxes = document.querySelectorAll("li > input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      const listItem = checkbox.closest('li');
      if (listItem) {
        listItem.style.display = 'flex';
        listItem.style.alignItems = 'center';
        listItem.style.paddingLeft = '0rem';
        listItem.style.marginLeft = '-1.30rem';
      }
    });
  }

  const blogMdOptions = {
    disableParsingRawHTML: false,
    wrapper: 'article',
    overrides: {
      blockquote: {
        props: { className: 'blog-blockquote' },
      },
      table: {
        component: HTMLTable,
        props: {
          interactive: true,
          className: 'blog-table',
        },
      },
      thead: { props: { className: 'blog-thead' } },
      tbody: { props: { className: 'blog-tbody' } },
      tr: { props: { className: 'blog-tr' } },
      th: { props: { className: 'blog-th' } },
      td: { props: { className: 'blog-td' } },
      pre: { props: { className: 'blog-pre' } },
      mark: { props: { style: { backgroundColor: '#FFECB1' } } },
      div: { props: { className: 'blog-div' } },
      img: { props: { className: 'blog-img' } },
      a: { props: { className: 'blog-anchor' } },
      ul: { props: { className: 'blog-ul' } },
      li: { props: { className: 'blog-li' } },
      p: { props: { className: 'blog-p' } },
      code: {
        component: CodeBlock,
      },
      h1: {
        component: MarkdownHeader(1),
        props: {
          className: 'blog-h1',
        },
      },
      h2: {
        component: MarkdownHeader(2),
        props: {
          className: 'blog-h2',
        },
      },
      h3: {
        component: MarkdownHeader(3),
        props: {
          className: 'blog-h3',
        },
      },
      h4: {
        component: MarkdownHeader(4),
        props: {
          className: 'blog-h4',
        },
      },
      h5: {
        component: MarkdownHeader(5),
        props: {
          className: 'blog-h5',
        },
      },
      h6: {
        component: MarkdownHeader(6),
        props: {
          className: 'blog-h6',
        },
      },
    },
  };

  const blogTitleOptions = {
    disableParsingRawHTML: false,
    overrides: {
      h1: {
        component: MarkdownHeader(1),
        props: {
          className: 'blog-h1',
        },
      },
    },
  };

  const TitleText = ({ title }) => {
    return <Markdown options={blogTitleOptions}>{`# ${title}`}</Markdown>;
  };

  const DateText = ({ date }) => {
    return <span style={{ fontSize: '14px' }}> {date}</span>;
  };

  const AuthorText = ({ author }) => {
    return (
      <span style={{ fontSize: '16px' }}>
        <em>{author}</em>
      </span>
    );
  };

  if (loading) {
    return (
      <div className='spinner-large'>
        <Spinner size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  } else {
    return (
      <div className='blog-content'>
        <header>
          <TitleText title={postInfo.title} />
          <div id='blog-post-metadata-container'>
            <img
              id='blog-post-metadata-profile-pic'
              src='https://avatars.githubusercontent.com/u/61774862?v=4'
              alt={`${postInfo.author}'s avatar`}
            />
            <div id='blog-post-metadata-info'>
              <AuthorText author={postInfo.author} />
              <DateText date={postInfo.dateCreated} />
            </div>
          </div>
          <Common.CategoryText
            categoryName={postInfo.category}
            className='detail-page-categories'
            onCatClick={openSearchBarWithQuery}
          />
          <Common.TagsGroup
            array={postInfo.tags}
            className='detail-page-tags'
            onTagClick={openSearchBarWithQuery}
          />
        </header>
        <hr />
        {isSearchBarOpen ? (
          <div className='spinner-large'>
            <Spinner size={SpinnerSize.LARGE} tagName='g' />
          </div>
        ) : (
          <Markdown options={blogMdOptions}>{postContent}</Markdown>
        )}
        <footer> </footer>
      </div>
    );
  }
};

export default BlogContent;
