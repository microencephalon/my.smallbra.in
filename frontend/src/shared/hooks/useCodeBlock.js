// frontend/src/shared/hooks/useCodeBlock.js
import { useState, useEffect } from 'react';

const useCodeBlock = () => {
  const [copied, setCopied] = useState(false);

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

  return { copied, setCopied };
};

export default useCodeBlock;
