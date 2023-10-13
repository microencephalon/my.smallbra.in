import { values } from 'lodash';
import { memo } from 'react';
import { getMatchingTags } from '../../../../../utils/search';
import { Tag } from '@blueprintjs/core';
import {
  SEARCH_MODES,
  SEARCH_MENU_DETAIL_ITEMS,
} from '../../../../../../constants/searchBar';
import { formatDate } from '../../../../../utils/string';
import SearchBar from '../../../SearchBar';

const Content = memo(({ val, highlighted, context }) => {
  const { tagQueries } = context;

  const headerData = {
    title: highlighted[SEARCH_MODES.title] || val[SEARCH_MODES.title],
    date: formatDate(val.dateCreated) || 'YYYY/DD/MM',
  };
  // Clone object
  let detailItems = { ...SEARCH_MENU_DETAIL_ITEMS };

  // Populate data properties
  Object.keys(detailItems).forEach((k) => {
    if (k !== 'tags') {
      detailItems[k].data = highlighted[SEARCH_MODES[k]];
    } else {
      const matchingTags = getMatchingTags(val, tagQueries);
      detailItems[k].data = matchingTags?.map((tag, i) => (
        <Tag key={i} minimal={false} style={{ color: 'white' }}>
          {tag}
        </Tag>
      ));
    }
  });

  // Make array out of values
  detailItems = values(detailItems);

  return (
    <div>
      <SearchBar.Menu.Item.Header
        title={headerData.title}
        date={headerData.date}
      />
      <SearchBar.Menu.Item.Details items={detailItems} context={context} />
    </div>
  );
});

export default Content;
