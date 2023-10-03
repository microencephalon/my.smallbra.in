// frontend/src/components/common/TagsGroup.jsx
import { Tag } from '@blueprintjs/core';

const CategoryText = ({ categoryName, className, onCatClick }) => {
  return (
    <Tag
      onClick={() => {
        onCatClick(`cat:${categoryName}`);
      }}
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
