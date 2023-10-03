// frontend/src/components/common/TagsGroup.jsx
import { Tag } from '@blueprintjs/core';

const TagsGroup = ({ array, className, onTagClick }) => {
  return array.map((tag, index) => (
    <Tag
      key={`tag-${index}`}
      onClick={() => {
        onTagClick(`tag:${tag}`);
      }}
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
