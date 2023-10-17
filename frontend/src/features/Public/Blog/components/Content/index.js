// frontend/src/features/Public/Blog/components/Content.jsx
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Common from '../../../../../shared/components/common';
import { CenterSpinner as Spinner } from '../../../../../shared/components/common/Spinners';
import {
  MetaDataContainer as Container,
  MetaDataAvatar as Avatar,
  MetaDataInfo as Info,
} from './MetaData';

import { useFetchData } from '../../../../../shared/hooks';
import { firefoxFixes } from '../../utils/dom';

import { MD_OPTIONS } from '../../../../../constants/blog';

const BlogContent = ({ context }) => {
  const { openSearchBarWithQuery, open: isSearchBarOpen } = context.searchBar;

  // In case URL is visited directly
  const { id: idFromParams } = useParams();

  const { postContent, postInfo, loading } = useFetchData.blog.content(
    idFromParams,
    isSearchBarOpen
  );

  const hyphenateString = useMemo(() => {
    return (str) => str.toLowerCase().trim().replace(/\s+/g, '-');
  }, []);

  // Firefox Support for any `@supports not (-moz-appearance: none) {}` block in `blog.css`
  const isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) {
    firefoxFixes.styleAnchors(document);
    firefoxFixes.fixCheckboxAlignment(document);
  }

  const blogMdOptions = MD_OPTIONS({
    actions: { hyphenateString },
    classNamesInit: 'blog-',
  }).body;
  const blogTitleOptions = MD_OPTIONS({
    actions: { hyphenateString },
    classNamesInit: 'blog-',
  }).title;

  const Title = ({ title }) => {
    return <Markdown options={blogTitleOptions}>{`# ${title}`}</Markdown>;
  };

  const Blog = {
    Content: {
      Spinner,
      Title,
      MetaData: {
        Container,
        Info,
        Avatar,
      },
    },
  };

  if (loading) {
    return <Blog.Content.Spinner />;
  } else {
    return (
      <div id='blog-content'>
        <header>
          <Blog.Content.Title title={postInfo.title} />
          <Blog.Content.MetaData.Container>
            <Blog.Content.MetaData.Avatar
              src='https://avatars.githubusercontent.com/u/61774862?v=4'
              author={postInfo.author}
            />
            <Blog.Content.MetaData.Info
              author={postInfo.author}
              date={postInfo.dateCreated}
            />
          </Blog.Content.MetaData.Container>
          <Common.Detail.Category
            categoryName={postInfo.category}
            className='detail-page-categories'
            onCatClick={openSearchBarWithQuery}
          />
          <Common.Detail.Tags
            array={postInfo.tags}
            className='detail-page-tags'
            onTagClick={openSearchBarWithQuery}
          />
        </header>
        <hr />
        {isSearchBarOpen ? (
          <Blog.Content.Spinner />
        ) : (
          <Markdown options={blogMdOptions}>{postContent}</Markdown>
        )}
      </div>
    );
  }
};

export default BlogContent;
