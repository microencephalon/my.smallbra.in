import { SEARCH_ICONS } from '../../../../../../constants/searchBar';
import { Icon, MenuItem, NonIdealState } from '@blueprintjs/core';

const NonIdeal = ({ type }) => {
  const NonIdealItem = ({ title }) => (
    <MenuItem
      id={'search-menu-item-non-ideal'}
      text={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon icon={SEARCH_ICONS.noResults} />
          <div style={{ marginLeft: '10px' }}>
            <NonIdealState
              className='mysb-omnibar-no-search-yields'
              layout='horizontal'
              title={title}
            />
          </div>
        </div>
      }
      disabled={true}
      roleStructure='none'
    />
  );

  if (type === 'resultless') {
    return <NonIdealItem title='Sorry, no results found.' />;
  } else if (type === 'queryless') {
    return <NonIdealItem title='Sorry, search query cannot be empty.' />;
  }
};

export default NonIdeal;
