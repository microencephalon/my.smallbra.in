// frontend/src/components/SBOmnibarLive.jsx
// @outdated -- needs to be updated along with corresponding hook useLiveSearch.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Menu,
  MenuItem,
  Button,
  Icon,
  Tag,
  HotkeysTarget2,
} from '@blueprintjs/core';
import { Omnibar } from '@blueprintjs/select';

import { SEARCHBAR_OPTIONS } from '../../../../constants/searchBar';

import { useLiveSearch } from '../../../hooks';
import { highlightQuery as handleHighlight } from '../../../utils/string';
import SearchBar from '../SearchBar';

const LiveSearchBar = ({ searchBarContext }) => {
  const { states: searchStates, handlers: searchHandlers } = useLiveSearch('');
  const {
    loading,
    item,
    items,
    isSpecSearch,
    searchBarLeftIco,
    searchMode,
    tagQueries,
    specQ,
    setItem,
    setIsSpecSearch,
    setSearchBarLeftIco,
  } = searchStates;

  const { handleSearchReset, handleSearchRequest } = searchHandlers;

  const context = searchBarContext;
  const {
    open,
    handleSearchBar,
    handleSearchBarClose,
    handleSearchBarToggle,
    setIsDialogOpen,
  } = context;

  const navigate = useNavigate();

  const SearchMenuSubItem = ({ data, type, divClass }) => {
    if (!data || (type === 'tag' && (!tagQueries || tagQueries.length <= 0))) {
      return null;
    }

    return (
      <div className={`search-menu-subitem ${divClass}`}>
        <span className='search-yield'>{data}</span>
        <Tag intent='none' minimal={true}>
          <span className='bp5-text-muted'>{type}</span>
        </Tag>
      </div>
    );
  };

  const handleSearchClose = () => {
    handleSearchReset();
    handleSearchBarClose();
  };

  const handleItemRender = (val, menuItemProps) => {
    const fields = ['title', 'category', 'description', 'summary'];
    const highlighted = {};

    fields.forEach((field) => {
      highlighted[field] = handleHighlight({
        searchMode,
        searchModeStr: field,
        specQ,
        val: val[field],
        item,
        highlightClass:
          field === 'title' ? 'search-yield-highlighted-title' : undefined,
      });
    });

    const subItems = [
      {
        data: tagQueries?.map((tag, i) => (
          <Tag key={i} minimal={false} style={{ color: 'white' }}>
            {tag}
          </Tag>
        )),
        type: 'tag',
        divClass: 'search-item-tags',
      },
      {
        data: highlighted['category'],
        type: 'category',
        divClass: 'search-item-category',
      },
      {
        data: highlighted['description'],
        type: 'portfolio:description',
        divClass: 'search-item-description',
      },
      {
        data: highlighted['summary'],
        type: 'blog:summary',
        divClass: 'search-item-summary',
      },
    ];

    const handleMenuItemClick = (val) => {
      return () => {
        handleSearchBar();
        navigate(`/${val.type}/${val.slug}/${val.id}`);
      };
    };

    const renderMenuItemContent = (val, highlighted) => (
      <div className={loading ? 'bp5-skeleton fade-in' : 'fade-in'}>
        {/* Menu Item Title */}
        <div
          className='search-item-title search-yield-title'
          style={{ paddingBottom: '5px' }}
        >
          {highlighted['title'] || val.title}
        </div>

        {/* Other Menu Item Details */}
        {subItems.map((item, i) => (
          <SearchMenuSubItem
            key={i}
            data={item.data}
            type={item.type}
            divClass={item.divClass}
          />
        ))}
      </div>
    );

    return (
      <MenuItem
        onClick={handleMenuItemClick(val)}
        key={val.id}
        text={renderMenuItemContent(val, highlighted)}
        active={menuItemProps.modifiers.active}
        roleStructure='listoption'
        className={`search-menu-item ${loading ? 'bp5-skeleton' : ''}`}
      />
    );
  };

  const handleItemListRender = ({ items, renderItem }) => {
    return <Menu id='search-results-menu'>{items.map(renderItem)}</Menu>;
  };

  const handleSearchLeftIcoMouseLeave = () => {
    switch (true) {
      case item.startsWith('tag:'):
        setSearchBarLeftIco('tag');
        break;
      case item.startsWith('title:') || item.startsWith('t:'):
        setSearchBarLeftIco('header-one');
        break;
      case item.startsWith('category:') || item.startsWith('cat:'):
        setSearchBarLeftIco('intersection');
        break;
      case item.startsWith('summary:') || item.startsWith('sum:'):
      case item.startsWith('description:') || item.startsWith('desc:'):
        setSearchBarLeftIco('search-template');
        break;
      default:
        setSearchBarLeftIco('search');
        break;
    }
  };

  const SearchBarRightEle = (
    <Button
      icon={<Icon icon='help' color='#CCCCCC' />}
      minimal={true}
      onClick={() => setIsDialogOpen(true)}
    />
  );

  const searchBarInputProps = {
    tagName: 'div',
    placeholder: 'Search...',
    type: 'text',
    rightElement: SearchBarRightEle,
    leftElement: isSpecSearch ? (
      <Button
        className='search-mode-icon fade-in'
        minimal={true}
        onMouseEnter={() => setSearchBarLeftIco('small-cross')}
        onMouseLeave={handleSearchLeftIcoMouseLeave}
        icon={<Icon icon={searchBarLeftIco} />}
        onClick={() => {
          setIsSpecSearch(!isSpecSearch);
          setItem('');
        }}
      />
    ) : (
      <Icon icon='search' />
    ),
  };

  useEffect(() => {
    const getSearchRequest = async () => {
      if (item) {
        try {
          await handleSearchRequest(item);
        } catch (error) {
          console.error('Error');
        }
      } else {
        handleSearchReset();
      }
    };
    getSearchRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isSpecSearch]);

  return (
    <HotkeysTarget2
      hotkeys={SEARCHBAR_OPTIONS.KEYS.show(handleSearchBarToggle)}
    >
      <SearchBar.Omnibar.HelpDialog isLiveSearch={true} context={context} />
      <Omnibar
        className='searchbar'
        onClose={handleSearchClose}
        onQueryChange={(newQuery) => setItem(newQuery)}
        itemRenderer={handleItemRender}
        itemListRenderer={handleItemListRender}
        isOpen={open}
        activeItem={item}
        items={loading ? [] : items}
        inputProps={searchBarInputProps}
      />
    </HotkeysTarget2>
  );
};

export default LiveSearchBar;
