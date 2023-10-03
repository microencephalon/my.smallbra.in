// frontend/src/components/SBOmnibar.jsx
import { useContext, useEffect, memo } from 'react';
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
  Spinner,
} from '@blueprintjs/core';
import { Omnibar, Select } from '@blueprintjs/select';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';
import { useSearch } from '../../hooks/useSearch';
import { omniShowHotkey } from '../../store/hotkeys/omnibarKeys';

import { highlightQuery as handleHighlight } from '../../helpers/string';
import { formatDate } from '../../helpers/string';

import { OmnibarHelpDialog } from './SBOmnibarHelpDialog';

import OMNIBAR_OPTIONS from '../../store/options/omnibarOptions';

const SBOmnibar = () => {
  const { FILTER_OPTIONS, SORT_OPTIONS, omnibarResets } = OMNIBAR_OPTIONS;

  const {
    open,
    isDialogOpen,
    setIsDialogOpen,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    isClearedFilter,
    setIsClearedFilter,
    isClearedSort,
    setIsClearedSort,
    handleOmnibarClose,
    handleOmnibarToggle,
  } = useContext(OmnibarContext);

  const navigate = useNavigate();

  const {
    states: searchStates,
    handlers: searchHandlers,
    refs: searchRefs,
    resets: searchResets,
  } = useSearch('');
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
    lastLoadedPage,
    totalPages,
    setLimit,
    setType,
  } = searchStates;

  const { handleSearchReset, handleSearchRequest } = searchHandlers;

  const { menuRef } = searchRefs;

  const handleSearchClose = () => {
    handleSearchReset();
    setSelectedFilter(omnibarResets.selectedFilter);
    setSelectedSort(omnibarResets.selectedSort);
    setIsClearedFilter(omnibarResets.isClearedFilter);
    setIsClearedSort(omnibarResets.isClearedSort);
    setIsDialogOpen(omnibarResets.isDialogOpen);
    handleOmnibarClose();
  };

  // DEBUG: Menu item content in place of renderMenuItemContent
  const MenuItemContent = memo(({ val, highlighted }) => {
    // Menu item content rendering logic

    const matchingTags = val.tags?.filter((tag) => {
      const regex = new RegExp(tagQueries.join('|'), 'i'); // Create a regex pattern from tagQueries
      return regex.test(tag);
    });

    const subItems = [
      {
        data: matchingTags?.map((tag, i) => (
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

    return (
      <div>
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
  });

  const handleItemRender = (val, menuItemProps) => {
    // For highlighting the text of the search results
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

    const handleMenuItemClick = (val) => {
      return () => {
        handleSearchReset();
        handleOmnibarClose();
        navigate(`/${val.itemType}/${val.slug}/${val.refId}`);
      };
    };

    const shouldFadeIn = val.pageNum > lastLoadedPage;

    return (
      <MenuItem
        onClick={handleMenuItemClick(val)}
        key={val.refId}
        text={<MenuItemContent val={val} highlighted={highlighted} />}
        active={menuItemProps.modifiers.active}
        roleStructure='listoption'
        className={`search-menu-item ${shouldFadeIn ? 'fade-in' : ''}`}
      />
    );
  };

  const handleItemListRender = ({ items, renderItem }) => {
    const NonIdealMenuItem = ({ title }) => (
      <MenuItem
        id={'search-menu-item-non-ideal'}
        text={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='issue' />
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

    const MenuSpinner = () => {
      return (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Spinner size={20} />
        </div>
      );
    };

    const MenuHeader = () => {
      return (
        <>
          <MenuItem
            tagName='div'
            className='search-menu-header'
            textClassName='search-menu-header-text'
            text={
              <span id='search-menu-header-text'>
                Search {items.length === 1 ? 'result' : 'results'} for{' '}
                <em>{item}</em>
              </span>
            }
            disabled={true}
            roleStructure='menuitem'
          />
          <MenuDivider />
        </>
      );
    };

    const TerminalMenuDivider = () => {
      return (
        <div id='search-menu-terminal-divider'>
          <MenuDivider />
        </div>
      );
    };

    const renderMenu = (children) => (
      <Menu
        id='search-results-menu'
        className='mysb-omnibar-menu'
        ulRef={menuRef}
      >
        {children}
      </Menu>
    );

    const NoResultsMenu = () => {
      return renderMenu(
        <>
          <MenuHeader />
          <NonIdealMenuItem title='Sorry, no results found.' />
        </>
      );
    };

    const EmptyQueryMenu = () => {
      return renderMenu(
        <>
          <MenuDivider />
          <NonIdealMenuItem title='Sorry, search query cannot be empty.' />
        </>
      );
    };

    if (searchPerformed) {
      if (items.length === 0 && item.trim()) {
        return <NoResultsMenu />;
      } else if (!item.trim()) {
        return <EmptyQueryMenu />;
      }
    }

    return renderMenu(
      <>
        {searchPerformed && <MenuHeader />}
        {items.map(renderItem)}
        {loading && <MenuSpinner />}
        {searchPerformed && page >= totalPages && <TerminalMenuDivider />}
      </>
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
        setOmnibarLeftIco(searchResets.omnibarLeftIco);
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
          setPage(searchResets.page);
          if (menuRef.current) {
            // if the menu is scrolled down, it will trigger
            menuRef.current.scrollTop = 0;
          }
          item.label === 'Clear Filter'
            ? setIsClearedFilter(omnibarResets.isClearedFilter)
            : setIsClearedFilter(false);
        }}
        activeItem={selectedFilter}
        itemRenderer={(item, { handleClick, modifiers }) => {
          return (
            <MenuItem
              id={`search-filter-option-${item.value ? item.value : 'clear'}`}
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
          id={`search-btn-filter${
            selectedFilter.value ? '-' + selectedFilter.value : ''
          }`}
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
          setPage(searchResets.page);
          if (menuRef.current) {
            // if the menu is scrolled down, it will trigger
            menuRef.current.scrollTop = 0;
          }
          item.label === 'Clear Sorting'
            ? setIsClearedSort(omnibarResets.isClearedSort)
            : setIsClearedSort(false);
        }}
        activeItem={selectedSort}
        itemRenderer={(item, { handleClick, modifiers }) => {
          return (
            <MenuItem
              id={`search-sort-option-${item.value ? item.value : 'clear'}`}
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
          id={`search-btn-sort${
            selectedSort.value ? '-' + selectedSort.value : ''
          }`}
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

  const HelpDialogButton = () => {
    return (
      <Button
        id={'search-btn-help'}
        icon={<Icon icon='help' color='#CCCCCC' />}
        minimal={true}
        onClick={() => setIsDialogOpen(true)}
      />
    );
  };

  const SubmitQueryButton = () => {
    return (
      <Button
        id={'search-btn-submit'}
        icon={<Icon icon='key-enter' />}
        disabled={searchPerformed ? true : false}
        onClick={() => {
          if (!searchPerformed) {
            handleSearchRequest();
          }
        }}
      />
    );
  };

  const OmnibarRightEle = (
    <ButtonGroup>
      <HelpDialogButton />
      <SortButton />
      <FilterButton />
      <SubmitQueryButton />
    </ButtonGroup>
  );

  const OmnibarLeftEle = isSpecSearch ? (
    <Button
      className='search-mode-icon fade-in'
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
    <Icon id='search-mode-icon-default' icon='search' />
  );

  const omnibarInputProps = {
    tagName: 'div',
    placeholder: 'Search...',
    type: 'text',
    className: 'search-input-box',
    onKeyDown: OmnibarKeyDownQuery,
    rightElement: OmnibarRightEle,
    leftElement: OmnibarLeftEle,
  };

  useEffect(() => {
    setItems([]);
    setSearchPerformed(searchResets.searchPerformed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <HotkeysTarget2 hotkeys={omniShowHotkey(handleOmnibarToggle)}>
      <>
        <OmnibarHelpDialog
          isDialogOpen={isDialogOpen}
          handleCloseDialog={() => setIsDialogOpen(omnibarResets.isDialogOpen)}
          isLiveSearch={false}
        />
        <Omnibar
          onClose={() => handleSearchClose()}
          query={item}
          onQueryChange={(newQuery) => {
            setItem(newQuery);
            setPage(searchResets.page);
            setLimit(searchResets.limit);
          }}
          itemRenderer={handleItemRender}
          itemListRenderer={handleItemListRender}
          isOpen={open}
          activeItem={item}
          items={items}
          inputProps={omnibarInputProps}
          className='mysb-omnibar'
        />
      </>
    </HotkeysTarget2>
  );
};

export default SBOmnibar;
