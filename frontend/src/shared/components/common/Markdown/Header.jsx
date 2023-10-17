import { createElement } from 'react';

const classNamesInit = 'blog-';

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

const MarkdownHeader = (level, actions) => (props) => {
  const { hyphenateString } = actions;

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
      {
        id: hyphenateString(customId),
        className: `${classNamesInit}h${level}`,
      },
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
        { id: customId, className: `${classNamesInit}h${level}` },
        [...children.slice(0, -1)]
      );
    } else {
      return createElement(
        `h${level}`,
        { id: customId, className: `${classNamesInit}h${level}` },
        children
      );
    }
  }
};

export default MarkdownHeader;
