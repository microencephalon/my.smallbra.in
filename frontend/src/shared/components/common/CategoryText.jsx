// frontend/src/components/common/TagsGroup.jsx
import { Tag } from '@blueprintjs/core';
import { SEARCH_PREFIXES, SEARCH_MODES } from '../../../constants/searchBar';

const CategoryText = ({ categoryName, className, onCatClick }) => {
  return (
    <Tag
      onClick={() => {
        onCatClick(`${SEARCH_PREFIXES.category[1]}${categoryName}`);
      }}
      aria-label={`Open search query for ${SEARCH_MODES.category}`}
      onRemove={undefined}
      interactive={false}
      minimal={true}
      large={true}
      className={className}
    >
      {categoryName}
    </Tag>
  );
};

export default CategoryText;
