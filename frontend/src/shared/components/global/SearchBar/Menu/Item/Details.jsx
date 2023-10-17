import { Tag } from '@blueprintjs/core';
import { SEARCH_MODES } from '../../../../../../constants/searchBar';

const Detail = ({ data, type, divClass, context }) => {
  const { tagQueries } = context;
  if (
    !data ||
    (type === SEARCH_MODES.tag && (!tagQueries || tagQueries.length <= 0))
  ) {
    return null;
  }

  return (
    <div className={`${divClass} search-details`}>
      <span className='search-yield bp5-text-small'>{data}</span>
      <Tag intent='none' minimal={true}>
        <span className='bp5-text-muted'>{type}</span>
      </Tag>
    </div>
  );
};

const Details = ({ items, context }) =>
  items.map((item, i) => (
    <Detail
      key={i}
      data={item.data}
      type={item.type}
      divClass={item.divClass}
      context={context}
    />
  ));

export default Details;
