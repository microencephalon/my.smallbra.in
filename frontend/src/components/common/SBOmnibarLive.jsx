// frontend/src/components/SBOmnibarLive.jsx
import { useState, useContext, useEffect } from 'react';
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
import { OmnibarContext } from '../../store/contexts/OmnibarContext';
import { useLiveSearch } from '../../hooks/useLiveSearch';
import { highlightQuery as handleHighlight } from '../../helpers/string';
import { omniShowHotkey } from '../../store/hotkeys/omnibarKeys';
import { OmnibarHelpDialog } from './SBOmnibarHelpDialog';

// TODO: I need to add the 'No Search Results Found' from SBOmnibar.jsx. Check it for lines 35, 43, 139, 252

const SBOmnibarLive = () => {
  const { states: searchStates, handlers: searchHandlers } = useLiveSearch('');
  const {
    loading,
    item,
    items,
    isSpecSearch,
    omnibarLeftIco,
    searchMode,
    tagQueries,
    specQ,
    setItem,
    setIsSpecSearch,
    setOmnibarLeftIco,
  } = searchStates;

  const { handleSearchReset, handleSearchRequest } = searchHandlers;

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { open, handleOmnibar, handleOmnibarClose, handleOmnibarToggle } =
    useContext(OmnibarContext);

  const navigate = useNavigate();

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

  const handleSearchClose = () => {
    handleSearchReset();
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
          className='item-title mysb-omnibar-search-yield-title'
          style={{ paddingBottom: '5px' }}
        >
          {highlighted['title'] || val.title}
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
        className={`search-menu-item ${loading ? 'bp5-skeleton' : ''}`}
      />
    );
  };

  const handleItemListRender = ({ items, renderItem }) => {
    return (
      <Menu id='search-results-menu' className='mysb-omnibar-menu'>
        {items.map(renderItem)}
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

  const OmnibarRightEle = (
    <Button
      icon={<Icon icon='help' color='#CCCCCC' />}
      minimal={true}
      onClick={() => setDialogOpen(true)}
    />
  );

  const omnibarInputProps = {
    tagName: 'div',
    placeholder: 'Search...',
    type: 'text',
    rightElement: OmnibarRightEle,
    leftElement: isSpecSearch ? (
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
    <HotkeysTarget2 hotkeys={omniShowHotkey(handleOmnibarToggle)}>
      <OmnibarHelpDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={() => setDialogOpen(false)}
        isLiveSearch={true}
      />
      <Omnibar
        onClose={handleSearchClose}
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

export default SBOmnibarLive;
