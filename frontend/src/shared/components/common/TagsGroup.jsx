// frontend/src/components/common/TagsGroup.jsx
import { Tag } from '@blueprintjs/core';
import { SEARCH_PREFIXES, SEARCH_MODES } from '../../../constants/searchBar';

const TagsGroup = ({ array, className, onTagClick }) => {
  return array.map((tag, index) => (
    <Tag
      key={`${SEARCH_MODES.tag}-${index}`}
      onClick={() => {
        onTagClick(`${SEARCH_PREFIXES.tag[0]}${tag}`);
      }}
      aria-label={`Open search query for ${SEARCH_MODES.tag}`}
      onRemove={undefined}
      interactive={false}
      minimal={true}
      large={true}
      className={className}
    >
      {tag}
    </Tag>
  ));
};

export default TagsGroup;
