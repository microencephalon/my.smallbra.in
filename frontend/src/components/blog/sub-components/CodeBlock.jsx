// frontend/src/components/blog/sub-components/CodeBlock.jsx
import { useContext, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  tomorrow,
  prism,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Position, Popover } from '@blueprintjs/core';
import { ThemeContext } from '../../../pages/Blog/BlogPost';

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useContext(ThemeContext);
  let language;
  className
    ? (language = className.replace('lang-', ''))
    : (language = 'code-string');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  // Firefox Support for any `@supports not (-moz-appearance: none) {}` block in `blog.css`
  useEffect(() => {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const preElems = document.querySelectorAll('.code pre');
    preElems.forEach((preEle) => {
      if (isFirefox) {
        if (preEle.querySelector('code.language-code-string')) {
          preEle.style.all = 'unset';
          preEle.style.setProperty('all', 'unset', '!important');
        }
      }
      // Add 'blog-pre' class to preEle
      preEle.classList.add('blog-pre');
    });
  }, []);

  useEffect(() => {
    if (copied) {
      const elements = document.querySelectorAll('.bp5-popover-content');
      elements.forEach((element) => {
        if (element.textContent.trim() === 'Copied!') {
          element.style.fontFamily = "'Asap', sans-serif";
          element.style.padding = '10px';
        }
      });
    }
  }, [copied]);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children);
    setCopied(true);
  };

  return (
    <div className='code' style={{ position: 'relative !important' }}>
      {className ? (
        <div
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            zIndex: 1,
          }}
        >
          <Popover
            content={
              copied ? <div className='copied-popover'>Copied!</div> : ''
            }
            position={Position.TOP}
            interactionKind='hover'
          >
            <Button
              intent='none'
              icon={copied ? 'clipboard' : 'duplicate'}
              style={{
                color: '#000000',
                backgroundColor: 'white',
                border: 'none',
                fontSize: '15px',
                borderRadius: '15px',
              }}
              onClick={copyToClipboard}
            ></Button>
          </Popover>
        </div>
      ) : (
        ''
      )}

      <SyntaxHighlighter language={language} style={isDark ? tomorrow : prism}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

/* Firefox */
// Get all pre elements
// Check if the browser is Firefox
if (typeof InstallTrigger !== 'undefined') {
  // Firefox
  // Get all pre elements
  const preElements = document.querySelectorAll('pre');
  // Loop through each pre element
  preElements.forEach((preElement) => {
    if (preElement.querySelector('code.language-code-string')) {
      preElement.style.all = 'unset';
      preElement.style.setProperty('all', 'unset', '!important');
    }
  });
}
