// frontend/src/components/blog/sub-components/CodeBlock.jsx
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@blueprintjs/core';

const CodeBlock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);

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
      preEle.classList.add('blog-pre');
    });
  }, []);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children);
    setCopied(true);
  };

  return (
    <div className='code'>
      {className ? (
        <Button
          className={!copied ? 'code-copy-btn' : 'code-copy-btn code-copied'}
          intent='none'
          text={!copied ? ' copy ' : 'copied'}
          onClick={copyToClipboard}
        ></Button>
      ) : (
        ''
      )}

      <SyntaxHighlighter language={language} style={prism}>
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
