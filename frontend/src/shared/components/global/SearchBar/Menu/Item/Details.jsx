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
    <div
      className={divClass}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '5px',
      }}
    >
      <span className='mysb-omnibar-search-yield'>{data}</span>
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
