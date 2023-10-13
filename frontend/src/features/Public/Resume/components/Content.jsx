// frontend/src/features/Public/Resume/components/Content.jsx
import { useState, useEffect, useMemo, createElement } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../components/resume.css';

import Markdown from 'markdown-to-jsx';
import { Spinner, SpinnerSize, Code, Pre, HTMLTable } from '@blueprintjs/core';

const storageBaseUrl = 'http://localhost:8081';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const ResumeContent = () => {
  const [resumeContent, setResumeContent] = useState('');
  const [, setResumeInfo] = useState({
    category: '',
    title: '',
    dateCreated: '',
    author: '',
  });
  const [loading, setLoading] = useState(true); // Set initial loading state

  // In case URL is visited directly
  const { id: idFromParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/resumes/current`);
        const resume = response.data;
        const mdFileURL = `${storageBaseUrl}${resume.content}`;

        const mdResponse = await axios.get(mdFileURL);
        const mdContent = mdResponse.data;

        const highlightedMdContent = mdContent.replace(
          /==([^=]+)==/g,
          '<span style="background-color: #FFECB1;">$1</span>'
        );
        setResumeContent(highlightedMdContent);

        const formattedDate = new Date(resume.dateCreated).toLocaleDateString(
          'en-US',
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }
        );

        setResumeInfo({
          category: resume.category,
          title: resume.title,
          dateCreated: formattedDate,
          author: resume.author,
        });
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idFromParams]);

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
        { id: hyphenateString(customId), className: `resume-h${level}` },
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
          { id: customId, className: `resume-h${level}` },
          [...children.slice(0, -1)]
        );
      } else {
        return createElement(
          `h${level}`,
          { id: customId, className: `resume-h${level}` },
          children
        );
      }
    }
  };

  if (loading) {
    return (
      <div className='resume-content'>
        <Spinner
          size={SpinnerSize.LARGE}
          tagName='g'
          className='spinner-large'
        />
      </div>
    );
  } else {
    return (
      <div className='resume-content' style={{ paddingTop: 15 }}>
        <Markdown
          options={{
            disableParsingRawHTML: false,
            wrapper: 'article',
            overrides: {
              blockquote: {
                props: { className: 'resume-blockquote' },
              },
              table: {
                component: HTMLTable,
                props: {
                  interactive: true,
                  className: 'resume-table',
                },
              },
              thead: { props: { className: 'resume-thead' } },
              tbody: { props: { className: 'resume-tbody' } },
              tr: { props: { className: 'resume-tr' } },
              th: { props: { className: 'resume-th' } },
              td: { props: { className: 'resume-td' } },
              pre: { component: Pre },
              div: { props: { className: 'resume-div' } },
              img: { props: { className: 'resume-img' } },
              a: { props: { className: 'resume-anchor' } },
              ul: { props: { className: 'resume-ul' } },
              li: { props: { className: 'resume-li' } },
              p: { props: { className: 'resume-p' } },
              code: {
                component: Code,
              },
              h1: {
                component: MarkdownHeader(1),
                props: {
                  className: 'resume-h1',
                },
              },
              h2: {
                component: MarkdownHeader(2),
                props: {
                  className: 'resume-h2',
                },
              },
              h3: {
                component: MarkdownHeader(3),
                props: {
                  className: 'resume-h3',
                },
              },
              h4: {
                component: MarkdownHeader(4),
                props: {
                  className: 'resume-h4',
                },
              },
              h5: {
                component: MarkdownHeader(5),
                props: {
                  className: 'resume-h5',
                },
              },
              h6: {
                component: MarkdownHeader(6),
                props: {
                  className: 'resume-h6',
                },
              },
            },
          }}
        >
          {resumeContent}
        </Markdown>
        <footer></footer>
      </div>
    );
  }
};

export default ResumeContent;
