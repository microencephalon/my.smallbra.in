// frontend/src/pages/Admin/BlogEditMarkdown.jsx
import { useState, useEffect, createElement } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  FormGroup,
  TextArea,
  Button,
  OverlayToaster,
  Position,
  Intent,
  Tabs,
  Tab,
  HTMLTable,
  Code,
  Pre,
} from '@blueprintjs/core';
import Markdown from 'markdown-to-jsx';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const AppToaster = OverlayToaster.create({
  position: Position.BOTTOM,
  canEscapeKeyClear: true,
});

const BlogEditMarkdown = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (post) {
        try {
          const response = await fetch(
            `http://localhost:8081/${post.content}?v=${Date.now()}`
          );
          const text = await response.text();
          setMarkdown(text);
        } catch (err) {
          console.error(`http://localhost:8081/${post.content}`);
          console.error('Error fetching markdown file:' + err);
        }
      }
    };

    fetchMarkdown();
  }, [post]);

  const handleMarkdownUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/posts/update-post/${id}`,
        { markdown: markdown },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        AppToaster.show({
          message: 'Markdown update successful!',
          isCloseButtonShown: false,
          intent: Intent.SUCCESS,
          timeout: 2500,
        });
      }
    } catch (err) {
      AppToaster.show({
        message: 'Error updating markdown!',
        isCloseButtonShown: false,
        intent: Intent.DANGER,
        timeout: 2500,
      });
      console.error('Error updating markdown:', err);
    }
  };

  const boxShadowSettings =
    'rgba(45, 114, 210, 0) 0px 0px 0px 0px, rgba(45, 114, 210, 0) 0px 0px 0px 0px, rgba(17, 20, 24, 0.2) 0px 0px 0px 1px inset, rgba(17, 20, 24, 0.5) 0px 1px 1px 0px inset';

  if (!post) {
    return <p>Loading...</p>;
  }

  const hyphenateString = () => {
    return (str) => str.toLowerCase().trim().replace(/\s+/g, '-');
  };

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
      pre: { component: Pre },
      mark: { props: { style: { backgroundColor: '#FFECB1' } } },
      div: { props: { className: 'blog-div' } },
      img: { props: { className: 'blog-img' } },
      a: { props: { className: 'blog-anchor' } },
      ul: { props: { className: 'blog-ul' } },
      li: { props: { className: 'blog-li' } },
      p: { props: { className: 'blog-p' } },
      code: {
        component: Code,
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>{post.title}</h2>
      <Tabs id='EditMarkdown' animate={true} large={true}>
        <Tab
          id='edit'
          title='Edit'
          panel={
            <FormGroup>
              <TextArea
                id='markdown'
                value={markdown}
                fill={true}
                autoResize={true}
                onChange={(e) => setMarkdown(e.target.value)}
                style={{ resize: 'none' }}
              />
            </FormGroup>
          }
        />
        <Tab
          id='preview'
          title='Preview'
          panel={
            <FormGroup
              style={{
                borderRadius: '2px',
                boxSizing: 'border-box',
                backgroundClip: 'border-box',
                boxShadow: boxShadowSettings,
                padding: '10px',
              }}
            >
              <Markdown options={blogMdOptions}>{markdown}</Markdown>
            </FormGroup>
          }
        />
      </Tabs>
      <Button onClick={handleMarkdownUpdate}>Save</Button>
    </div>
  );
};

export default BlogEditMarkdown;
