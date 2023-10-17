import MD from '../shared/components/common/Markdown';
import CodeBlock from '../features/Public/Blog/components/Content/CodeBlock';
import { HTMLTable } from '@blueprintjs/core';

export const MD_OPTIONS = ({ actions, classNamesInit }) => {
  const { hyphenateString } = actions;

  const title = {
    disableParsingRawHTML: false,
    overrides: {
      h1: {
        component: MD.Header(1, { hyphenateString }),
        props: {
          className: classNamesInit + 'h1',
        },
      },
    },
  };

  const body = {
    disableParsingRawHTML: false,
    wrapper: 'article',
    overrides: {
      blockquote: {
        props: { className: classNamesInit + 'blockquote' },
      },
      table: {
        component: HTMLTable,
        props: {
          interactive: true,
          className: classNamesInit + 'table',
        },
      },
      thead: { props: { className: classNamesInit + 'thead' } },
      tbody: { props: { className: classNamesInit + 'tbody' } },
      tr: { props: { className: classNamesInit + 'tr' } },
      th: { props: { className: classNamesInit + 'th' } },
      td: { props: { className: classNamesInit + 'td' } },
      pre: { props: { className: classNamesInit + 'pre' } },
      mark: { props: { style: { backgroundColor: '#FFECB1' } } },
      div: { props: { className: classNamesInit + 'div' } },
      img: { props: { className: classNamesInit + 'img' } },
      a: { props: { className: classNamesInit + 'anchor' } },
      ul: { props: { className: classNamesInit + 'ul' } },
      li: { props: { className: classNamesInit + 'li' } },
      p: { props: { className: classNamesInit + 'p' } },
      code: {
        component: CodeBlock,
      },
      h1: {
        component: MD.Header(1, { hyphenateString }),
        props: {
          className: classNamesInit + 'h1',
        },
      },
      h2: {
        component: MD.Header(2, { hyphenateString }),
        props: {
          className: classNamesInit + 'h2',
        },
      },
      h3: {
        component: MD.Header(3, { hyphenateString }),
        props: {
          className: classNamesInit + 'h3',
        },
      },
      h4: {
        component: MD.Header(4, { hyphenateString }),
        props: {
          className: classNamesInit + 'h4',
        },
      },
      h5: {
        component: MD.Header(5, { hyphenateString }),
        props: {
          className: classNamesInit + 'h5',
        },
      },
      h6: {
        component: MD.Header(6, { hyphenateString }),
        props: {
          className: classNamesInit + 'h6',
        },
      },
    },
  };
  return { title, body };
};
