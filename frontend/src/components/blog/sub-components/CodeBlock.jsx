import { useContext, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  tomorrow,
  prism,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaPaste } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ThemeContext } from '../../../pages/Blog/Post';

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
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  // Firefox Support for any `@supports not (-moz-appearance: none) {}` block in `blog.css`
  useEffect(() => {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) {
      const preElems = document.querySelectorAll('pre');
      preElems.forEach((preEle) => {
        if (preEle.querySelector('code.language-code-string')) {
          preEle.style.all = 'unset';
          preEle.style.setProperty('all', 'unset', '!important');
        }
      });
    }
  }, []);

  const copyTooltip = <Tooltip id='tooltip-copied'>Copied!</Tooltip>;

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children);
    setCopied(true);
  };

  return (
    <div className='code'>
      {className ? (
        <OverlayTrigger
          placement='left'
          trigger='click'
          overlay={copyTooltip}
          show={copied}
          rootClose={true}
        >
          <Button
            variant='dark'
            className='copy-code-btn'
            onClick={copyToClipboard}
          >
            {copied ? <FaPaste /> : <FaCopy />}
          </Button>
        </OverlayTrigger>
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
const preElements = document.querySelectorAll('pre');
// Loop through each pre element
preElements.forEach((preElement) => {
  if (preElement.querySelector('code.language-code-string')) {
    preElement.style.all = 'unset';
    preElement.style.setProperty('all', 'unset', '!important');
  }
});
