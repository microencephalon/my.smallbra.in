// frontend/src/components/SBOmnibar.jsx
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Button,
  Icon,
  Tag,
  HotkeysTarget2,
  ButtonGroup,
  NonIdealState,
  MenuDivider,
  Position,
} from '@blueprintjs/core';
import { Omnibar, Select } from '@blueprintjs/select';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';
import { useSearch } from '../../hooks/useSearch';
import { omniShowHotkey } from '../../store/hotkeys/omnibarKeys';

import { highlightQuery as handleHighlight } from '../../helpers/queryHighlighter';
import { formatDate } from '../../helpers/formateDate';

import { OmnibarHelpDialog } from './SBOmnibarHelpDialog';

import OMNIBAR_OPTIONS from '../../store/options/omnibarOptions';

const SBOmnibar = () => {
  const { FILTER_DEFAULT, FILTER_OPTIONS, SORT_DEFAULT, SORT_OPTIONS } =
    OMNIBAR_OPTIONS;

  const { open, handleOmnibar, handleOmnibarClose, handleOmnibarToggle } =
    useContext(OmnibarContext);

  const navigate = useNavigate();

  const { states: searchStates, handlers: searchHandlers } = useSearch('');
  const {
    loading,
    item,
    items,
    isSpecSearch,
    omnibarLeftIco,
    searchMode,
    tagQueries,
    specQ,
    searchPerformed,
    setItem,
    setItems,
    setIsSpecSearch,
    setOmnibarLeftIco,
    setSearchPerformed,
    setSort,
    page,
    setPage,
    limit,
    setLimit,
    setType,
  } = searchStates;

  const { handleSearchReset, handleSearchRequest } = searchHandlers;

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_DEFAULT);
  const [selectedSort, setSelectedSort] = useState(SORT_DEFAULT); // Set default sort option
  const [isClearedFilter, setIsClearedFilter] = useState(true);
  const [isClearedSort, setIsClearedSort] = useState(true);

  const handleSearchClose = () => {
    handleSearchReset();
    setSelectedFilter(FILTER_DEFAULT);
    setSelectedSort(SORT_DEFAULT);
    setIsClearedFilter(true);
    setIsClearedSort(true);
    setDialogOpen(false);
    handleOmnibarClose();
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
          field === 'title' ? 'mysb-omnibar-hl-yield-title' : undefined,
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
        divClass: 'item-tags',
      },
      {
        data: highlighted['category'],
        type: 'category',
        divClass: 'item-category',
      },
      {
        data: highlighted['description'],
        type: 'portfolio:description',
        divClass: 'item-description',
      },
      {
        data: highlighted['summary'],
        type: 'blog:summary',
        divClass: 'item-summary',
      },
    ];

    const handleMenuItemClick = (val) => {
      return () => {
        handleOmnibar();
        navigate(`/${val.type}/${val.slug}/${val.id}`);
      };
    };

    const renderMenuItemContent = (val, highlighted) => (
      <div className={loading ? 'bp5-skeleton fade-in' : 'fade-in'}>
        {/* Menu Item Title */}
        <div
          style={{
            paddingBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span className='item-title mysb-omnibar-search-yield-title'>
            {highlighted['title'] || val.title}
          </span>
          <span className='item-date mysb-omnibar-search-yield-date bp5-text-small'>
            {formatDate(val.dateCreated) || 'YYYY/DD/MM'}
          </span>
        </div>

        {/* Other Menu Item Details */}
        {subItems.map((item, i) => (
          <OmniMenuSubItem
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
        className={`mysb-omnibar-menu-item ${loading ? 'bp5-skeleton' : ''}`}
      />
    );
  };

  const handleItemListRender = ({ items, renderItem }) => {
    if (searchPerformed) {
      if (items.length === 0 && item.trim()) {
        return (
          <Menu className='mysb-omnibar-menu'>
            <MenuItem
              className='mysb-omnibar-menu-item-header'
              text={
                <span className='mysb-omnibar-menu-item-header-text'>
                  Search {items.length === 1 ? 'result' : 'results'} for{' '}
                  <em>{item}</em>
                </span>
              }
              disabled={true}
            />
            <MenuDivider />
            <MenuItem
              text={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon='issue' />
                  <div style={{ marginLeft: '10px' }}>
                    <NonIdealState
                      className='mysb-omnibar-no-search-yields'
                      layout='horizontal'
                      title='Sorry, no results found.'
                    />
                  </div>
                </div>
              }
              disabled={true}
              roleStructure='none'
            />
          </Menu>
        );
      } else if (!item.trim()) {
        return (
          <Menu className='mysb-omnibar-menu'>
            <MenuDivider />
            <MenuItem
              text={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon='issue' />
                  <div style={{ marginLeft: '10px' }}>
                    <NonIdealState
                      className='mysb-omnibar-no-search-yields'
                      layout='horizontal'
                      title='Sorry, search query cannot be empty.'
                    />
                  </div>
                </div>
              }
              disabled={true}
              roleStructure='none'
            />
          </Menu>
        );
      }
    }

    return (
      <Menu className='mysb-omnibar-menu'>
        {searchPerformed && (
          <>
            <MenuItem
              tagName='div'
              className='mysb-omnibar-menu-item-header'
              textClassName='mysb-omnibar-menu-item-header-text'
              text={
                <span className='mysb-omnibar-menu-item-header-text'>
                  Search {items.length === 1 ? 'result' : 'results'} for{' '}
                  <em>{item}</em>
                </span>
              }
              disabled={true}
              roleStructure='menuitem'
            />
            <MenuDivider />
          </>
        )}
        {items.map(renderItem)}
        {searchPerformed && (
          <>
            <MenuDivider />
            <Button
              icon={<Icon icon='more' />}
              fill={true}
              minimal={true}
              onClick={() => {
                setPage(page + 1);
              }} // add a function to handle loading an additional page, which is 10 more items, from the backend
            />
          </>
        )}
      </Menu>
    );
  };

  const handleOmniLeftIcoMouseLeave = () => {
    switch (true) {
      case item.startsWith('tag:'):
        setOmnibarLeftIco('tag');
        break;
      case item.startsWith('title:') || item.startsWith('t:'):
        setOmnibarLeftIco('header-one');
        break;
      case item.startsWith('category:') || item.startsWith('cat:'):
        setOmnibarLeftIco('intersection');
        break;
      case item.startsWith('summary:') || item.startsWith('sum:'):
      case item.startsWith('description:') || item.startsWith('desc:'):
        setOmnibarLeftIco('search-template');
        break;
      default:
        setOmnibarLeftIco('search');
        break;
    }
  };

  const OmniMenuSubItem = ({ data, type, divClass }) => {
    if (!data || (type === 'tag' && (!tagQueries || tagQueries.length <= 0))) {
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

  const OmnibarKeyDownQuery = (event) => {
    if (!searchPerformed && event.key === 'Enter') {
      handleSearchRequest();
    }
  };

  const FilterButton = () => {
    return (
      <Select
        items={FILTER_OPTIONS}
        itemPredicate={(query, item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        }
        onItemSelect={(item) => {
          setSelectedFilter(item);
          setType(item.value);
          item.label === 'Clear Filter'
            ? setIsClearedFilter(true)
            : setIsClearedFilter(false);
        }}
        activeItem={selectedFilter}
        itemRenderer={(item, { handleClick, modifiers }) => {
          return (
            <MenuItem
              active={modifiers.active}
              icon={
                selectedFilter.value === item.value &&
                !selectedFilter.label.startsWith('Clear') ? (
                  <Icon className='fade-in' icon='small-tick' />
                ) : (
                  <Icon
                    className='fade-in'
                    icon={item.icon}
                    intent={!item.label.startsWith('Clear') ? 'none' : 'danger'}
                  />
                )
              }
              className={
                selectedFilter.value === item.value &&
                !selectedFilter.label.startsWith('Clear')
                  ? 'mysb-omnibar-sort-active-item'
                  : 'mysb-omnibar-sort-inactive-item'
              }
              key={item.value}
              onClick={handleClick}
              text={item.label}
              roleStructure='listoption'
              disabled={
                item.label.startsWith('Clear')
                  ? isClearedFilter === true
                    ? true
                    : false
                  : false
              }
            />
          );
        }}
        filterable={false}
        popoverProps={{
          position: Position.BOTTOM_RIGHT,
          minimal: true,
          interactionKind: 'click',
          canEscapeKeyClose: true,
          hoverCloseDelay: 0,
        }}
      >
        <Button
          outlined={true}
          icon={
            selectedFilter && !selectedFilter.label.startsWith('Clear')
              ? selectedFilter.icon
              : 'filter'
          }
          onClick={() => {}}
        />
      </Select>
    );
  };

  const SortButton = () => {
    return (
      <Select
        items={SORT_OPTIONS}
        itemPredicate={(query, item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        }
        onItemSelect={(item) => {
          setSelectedSort(item);
          setSort(item.value);
          item.label === 'Clear Sorting'
            ? setIsClearedSort(true)
            : setIsClearedSort(false);
        }}
        activeItem={selectedSort}
        itemRenderer={(item, { handleClick, modifiers }) => {
          return (
            <MenuItem
              active={modifiers.active}
              icon={
                selectedSort.value === item.value &&
                !selectedSort?.label.startsWith('Clear') ? (
                  <Icon className='fade-in' icon='small-tick' />
                ) : (
                  <Icon
                    className='fade-in'
                    icon={item.icon}
                    intent={!item.label.startsWith('Clear') ? 'none' : 'danger'}
                  />
                )
              }
              className={
                selectedSort.value === item.value &&
                !selectedSort?.label.startsWith('Clear')
                  ? 'mysb-omnibar-sort-active-item'
                  : 'mysb-omnibar-sort-inactive-item'
              }
              key={item.value}
              onClick={handleClick}
              text={item.label}
              roleStructure='listoption'
              disabled={
                item.label.startsWith('Clear')
                  ? isClearedSort === true
                    ? true
                    : false
                  : false
              }
            />
          );
        }}
        filterable={false}
        popoverProps={{
          position: Position.BOTTOM_RIGHT,
          minimal: true,
          interactionKind: 'click',
          canEscapeKeyClose: true,
          hoverCloseDelay: 0,
        }}
      >
        <Button
          outlined={true}
          icon={
            selectedSort
              ? selectedSort.label.startsWith('Clear')
                ? 'sort'
                : selectedSort.icon
              : 'sort'
          }
        />
      </Select>
    );
  };

  const OmnibarRightEle = (
    <ButtonGroup>
      <Button
        icon={<Icon icon='help' color='#CCCCCC' />}
        minimal={true}
        onClick={() => setDialogOpen(true)}
      />
      <SortButton />
      <FilterButton />
      <Button
        icon={<Icon icon='key-enter' />}
        disabled={searchPerformed ? true : false}
        onClick={handleSearchRequest}
      />
    </ButtonGroup>
  );

  const OmnibarLeftEle = isSpecSearch ? (
    <Button
      className='mysb-omnibar-tag-btn fade-in'
      minimal={true}
      onMouseEnter={() => setOmnibarLeftIco('small-cross')}
      onMouseLeave={handleOmniLeftIcoMouseLeave}
      icon={<Icon icon={omnibarLeftIco} />}
      onClick={() => {
        setIsSpecSearch(!isSpecSearch);
        setItem('');
      }}
    />
  ) : (
    <Icon icon='search' />
  );

  const omnibarInputProps = {
    tagName: 'div',
    placeholder: 'Search...',
    type: 'text',
    onKeyDown: OmnibarKeyDownQuery,
    rightElement: OmnibarRightEle,
    leftElement: OmnibarLeftEle,
  };

  useEffect(() => {
    setItems([]);
    setSearchPerformed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <HotkeysTarget2 hotkeys={omniShowHotkey(handleOmnibarToggle)}>
      <OmnibarHelpDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={() => setDialogOpen(false)}
        isLiveSearch={false}
      />
      <Omnibar
        onClose={handleSearchClose}
        query={item}
        onQueryChange={(newQuery) => setItem(newQuery)}
        itemRenderer={handleItemRender}
        itemListRenderer={handleItemListRender}
        isOpen={open}
        activeItem={item}
        items={loading ? [] : items}
        inputProps={omnibarInputProps}
        className='mysb-omnibar'
      />
    </HotkeysTarget2>
  );
};

export default SBOmnibar;
