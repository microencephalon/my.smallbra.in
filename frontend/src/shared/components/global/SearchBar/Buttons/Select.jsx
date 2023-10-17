// frontend/src/shared/components/global/SearchBar/Buttons/Select.jsx
import { MenuItem, Icon } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import {
  SEARCHBAR_OPTIONS,
  OPERATIONS_OPTIONS,
  SEARCH_ICONS,
} from '../../../../../constants/searchBar';

const SearchBarButtonSelect = ({ kind, children, context }) => {
  const {
    setSelectedFilter,
    setSelectedSort,
    setIsClearedFilter,
    setIsClearedSort,
    setType,
    setSort,
    setPage,
    selectedFilter,
    selectedSort,
    isClearedFilter,
    isClearedSort,
    menuRef,
  } = context;
  const { SEARCHBAR_RESETS, FILTER_OPTIONS, SORT_OPTIONS } = SEARCHBAR_OPTIONS;
  const set = (k) => {
    const Selected = (item) => {
      switch (k) {
        case 'filter':
          setSelectedFilter(item);
          break;
        case 'sort':
          setSelectedSort(item);
          break;
        default:
          console.error('set.Selected(): No type of that kind exists');
          break;
      }
    };
    const IsCleared = (item) => {
      const isClearLabel = item.label.toLowerCase() === `clear ${k}`;
      let resetValue;

      switch (k) {
        case 'filter':
          resetValue = SEARCHBAR_RESETS.isClearedFilter;
          setIsClearedFilter(isClearLabel ? resetValue : false);
          break;
        case 'sort':
          resetValue = SEARCHBAR_RESETS.isClearedSort;
          setIsClearedSort(isClearLabel ? resetValue : false);
          break;
        default:
          console.error('set.IsCleared(): No type of that kind exists');
          break;
      }
    };
    const Kind = (item) => {
      switch (k) {
        case 'filter':
          setType(item.value);
          break;
        case 'sort':
          setSort(item.value);
          break;
        default:
          console.error('set.Kind(): No type of that kind exists');
          break;
      }
    };
    return { Selected, IsCleared, Kind };
  };

  const get = (k) => {
    const Selected = () => {
      switch (k) {
        case 'filter':
          return selectedFilter;
        case 'sort':
          return selectedSort;
        default:
          console.error('get.Selected(): No type of that kind exists');
          return {};
      }
    };
    const Options = () => {
      switch (k) {
        case 'filter':
          return FILTER_OPTIONS;
        case 'sort':
          return SORT_OPTIONS;
        default:
          console.error('get.Options(): No type of that kind exists');
          return {};
      }
    };
    const IsCleared = () => {
      switch (k) {
        case 'filter':
          return isClearedFilter;
        case 'sort':
          return isClearedSort;
        default:
          console.error('get.IsCleared(): No type of that kind exists');
          return {};
      }
    };
    return { Selected, Options, IsCleared };
  };

  const handleItemCustomization = (query, item) => {
    return item.label.toLowerCase().includes(query.toLowerCase());
  };

  const handleItemSelect = (k, item) => {
    set(k).Selected(item);
    set(k).Kind(item); // setType && setSort
    setPage(SEARCHBAR_RESETS.page);
    if (menuRef.current) menuRef.current.scrollTop = 0;
    set(k).IsCleared(item);
  };

  const handleItemRender = (item, handleClick, mods, k) => {
    const { value, label } = item;
    const disabled = label.toLowerCase().startsWith('clear')
      ? get(k).IsCleared()
        ? true
        : false
      : false;

    const getIcon = (selectedValue, item) => {
      const icon =
        selectedValue === item.value &&
        !item.label.toLowerCase().startsWith('clear')
          ? SEARCH_ICONS.activeSearchMethod
          : item.icon;
      const intent = !item.label.toLowerCase().startsWith('clear')
        ? 'none'
        : 'danger';
      return <Icon className='fade-in' icon={icon} intent={intent} />;
    };

    const getClassName = (selectedValue, item) => {
      const initClassName = 'searchbar-';
      return selectedValue === item.value &&
        !item.label.toLowerCase().startsWith('clear')
        ? initClassName + `sort-active-item`
        : initClassName + `sort-inactive-item`;
    };

    const selected = get(k).Selected();
    const icon = getIcon(selected.value, item);
    const className = getClassName(selected.value, item);

    return (
      <MenuItem
        id={`search-${k}-option-${value ? value : 'clear'}`}
        active={mods.active}
        key={value}
        icon={icon}
        className={className}
        onClick={handleClick}
        text={label}
        roleStructure='listoption'
        disabled={disabled}
      />
    );
  };

  return (
    <Select
      items={get(kind).Options()}
      itemPredicate={(query, item) => handleItemCustomization(query, item)}
      onItemSelect={(item) => handleItemSelect(kind, item)}
      activeItem={get(kind).Selected()}
      itemRenderer={(item, { handleClick, modifiers }) =>
        handleItemRender(item, handleClick, modifiers, kind)
      }
      filterable={false}
      popoverProps={OPERATIONS_OPTIONS.popovers}
    >
      {children}
    </Select>
  );
};

export default SearchBarButtonSelect;
