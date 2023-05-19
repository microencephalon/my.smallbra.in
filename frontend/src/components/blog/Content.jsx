// frontend/src/components/blog/Content.jsx
// import SplashImage from '../../assets/images/splash.jpg';
// import Badge from 'react-bootstrap/Badge';
// import LoremIpsum from './tmp/LoremIpsum';
// import Image from '../Image';
import { useState, useEffect, useMemo, createElement } from 'react';
import Md from 'markdown-to-jsx';
import CodeBlock from './sub-components/CodeBlock';
import axios from 'axios';

const storageBaseUrl = 'http://localhost:8081';

// https://github.com/willjw3/react-markdown-blog/blob/master/src/pages/post.js
// TODO: Look at the code above for how to use react-markdown to import 'md' files as posts

const BlogContent = ({ postId }) => {
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/posts/${postId}`
        );
        const post = response.data;
        const mdFileURL = `${storageBaseUrl}${post.content}`;

        const mdResponse = await axios.get(mdFileURL);
        const mdContent = mdResponse.data;

        const highlightedMdContent = mdContent.replace(
          /==([^=]+)==/g,
          '<span style="background-color: #FFECB1;">$1</span>'
        );
        setPostContent(highlightedMdContent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

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

  const customIdRenderer = (level) => (props) => {
    // console.log(props);
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
        { id: hyphenateString(customId) },
        text
      );
    } else {
      customId = iteratePropsChildren(children);
      if (
        typeof children[children.length - 1] === 'string' &&
        regex.exec(children[children.length - 1])
      ) {
        return createElement(`h${level}`, { id: customId }, [
          ...children.slice(0, -1),
        ]);
      } else {
        return createElement(`h${level}`, { id: customId }, children);
      }
    }
  };

  const headerLevels = [1, 2, 3, 4, 5, 6];
  const headerOverrides = headerLevels.reduce((acc, level) => {
    acc[`h${level}`] = { component: customIdRenderer(level) }; // e.g.,
    return acc;
  }, []);

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

  return (
    <div className='blog-content'>
      {/* <header>
        <Md>#### // Tutorial Type //</Md>
        <Md># Title</Md>

        <Md>##### Date, Edited Date, XX Min Read</Md>

        <Badge bg='secondary'>networking</Badge>
        <Badge bg='secondary'>nginx</Badge>
        <Md>#### *by Dana Tolman*</Md>
        <Image
          imgName={'cld-sample-5'}
          w={730}
          h={300}
          cornersRadius={30}
          ext={'webp'}
          gravityMode={'object'}
          qualityMode={'auto'}
          placeholderMode='blur'
          loadingMode='lazy'
        />
      </header> */}
      {/* <br />
      <br />
      <br />
      <br />
      <br /> */}
      <Md
        options={{
          disableParsingRawHTML: false,
          wrapper: 'article',
          overrides: {
            code: {
              component: CodeBlock,
            },
            ...headerOverrides,
          },
        }}
      >
        {postContent}
      </Md>
      <footer></footer>
    </div>
  );
};

export default BlogContent;
