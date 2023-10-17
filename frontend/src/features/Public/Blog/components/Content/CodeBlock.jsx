// frontend/src/features/Public/Blog/components/CodeBlock.jsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@blueprintjs/core';
import { useCodeBlock } from '../../../../../shared/hooks';
import { firefoxFixes } from '../../utils/dom';

const CodeBlock = ({ className, children }) => {
  const { copied, setCopied } = useCodeBlock();

  let language;
  className
    ? (language = className.replace('lang-', ''))
    : (language = 'code-string');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
  };

  return (
    <div className='code'>
      {className ? (
        <Button
          className={
            !copied
              ? 'blog-code-copy-btn'
              : 'blog-code-copy-btn blog-code-copied-btn'
          }
          intent='none'
          text={!copied ? ' copy ' : 'copied'}
          onClick={copyToClipboard}
        />
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
// get all <pre> elements and make conditional mods
if (typeof InstallTrigger !== 'undefined') {
  firefoxFixes.fixPreElements();
}
