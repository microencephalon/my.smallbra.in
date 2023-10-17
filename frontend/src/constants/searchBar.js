// frontend/src/constants/searchBar.js

import { Position, Button, Icon, KeyComboTag } from '@blueprintjs/core';
import { keyDownAction } from '../shared/utils/keys';
import SearchBar from '../shared/components/global/SearchBar';

// References to BlueprintJS icons: https://blueprintjs.com/docs/#icons/icons-list
export const SEARCH_ICONS = {
  generalSearch: 'search',
  tag: 'tag',
  title: 'header-one',
  category: 'intersection',
  summary: 'search-template',
  description: 'search-template',
  blog: 'manually-entered-data',
  portfolio: 'projects',
  filter: 'filter',
  clearFilter: 'filter-remove',
  sort: 'sort',
  clearSort: 'delete',
  toggleOpen: 'open-application',
  ascending: 'sort-alphabetical',
  descending: 'sort-alphabetical-desc',
  newest: 'clean',
  oldest: 'history',
  helpDialog: 'help',
  helpDialogClose: 'cross',
  activeSearchMethod: 'small-tick',
  submitQuery: 'key-enter',
  removeSpecificQuery: 'small-cross',
  noResults: 'issue',
};

export const SEARCH_MODES = {
  general: 'general',
  tag: 'tag',
  title: 'title',
  category: 'category',
  summary: 'summary',
  description: 'description',
};

export const SEARCH_PREFIXES = {
  tag: ['tag:'],
  title: ['title:', 't:'],
  category: ['category:', 'cat:'],
  summary: ['summary:', 'sum:'],
  description: ['description:', 'desc:'],
};

export const PREFIX_MAP = {
  'tag:': {
    replace: [SEARCH_PREFIXES.tag[0], ''],
    searchBarIcon: SEARCH_ICONS.tag,
    searchMode: SEARCH_MODES.tag,
    endpointParam: 'tags',
    splitQuery: true,
  },
  'title:': {
    replace: [SEARCH_PREFIXES.title[0], ''],
    searchBarIcon: SEARCH_ICONS.title,
    searchMode: SEARCH_MODES.title,
    endpointParam: SEARCH_MODES.title,
  },
  't:': {
    replace: [SEARCH_PREFIXES.title[1], ''],
    searchBarIcon: SEARCH_ICONS.title,
    searchMode: SEARCH_MODES.title,
    endpointParam: SEARCH_MODES.title,
  },
  'category:': {
    replace: [SEARCH_PREFIXES.category[0], ''],
    searchBarIcon: SEARCH_ICONS.category,
    searchMode: SEARCH_MODES.category,
    endpointParam: SEARCH_MODES.category,
  },
  'cat:': {
    replace: [SEARCH_PREFIXES.category[1], ''],
    searchBarIcon: SEARCH_ICONS.category,
    searchMode: SEARCH_MODES.category,
    endpointParam: SEARCH_MODES.category,
  },
  'summary:': {
    replace: [SEARCH_PREFIXES.summary[0], ''],
    searchBarIcon: SEARCH_ICONS.summary,
    searchMode: SEARCH_MODES.summary,
    endpointParam: SEARCH_MODES.summary,
  },
  'sum:': {
    replace: [SEARCH_PREFIXES.summary[1], ''],
    searchBarIcon: SEARCH_ICONS.summary,
    searchMode: SEARCH_MODES.summary,
    endpointParam: SEARCH_MODES.summary,
  },
  'description:': {
    replace: [SEARCH_PREFIXES.description[0], ''],
    searchBarIcon: SEARCH_ICONS.description,
    searchMode: SEARCH_MODES.description,
    endpointParam: SEARCH_MODES.description,
  },
  'desc:': {
    replace: [SEARCH_PREFIXES.description[1], ''],
    searchBarIcon: SEARCH_ICONS.description,
    searchMode: SEARCH_MODES.description,
    endpointParam: SEARCH_MODES.description,
  },
};

export const ALL_PREFIXES = Object.keys(PREFIX_MAP);

export const FIELDS_FOR_HIGHLIGHT = [
  SEARCH_MODES.title,
  SEARCH_MODES.category,
  SEARCH_MODES.description,
  SEARCH_MODES.summary,
];

export const SEARCH_MENU_DETAIL_ITEMS = {
  tags: {
    data: null,
    type: SEARCH_MODES.tag,
    divClass: 'search-item-tags',
  },
  category: {
    data: null,
    type: SEARCH_MODES.category,
    divClass: `item-${SEARCH_MODES.category}`,
  },
  description: {
    data: null,
    type: `portfolio:${SEARCH_MODES.description}`,
    divClass: `item-${SEARCH_MODES.description}`,
  },
  summary: {
    data: null,
    type: `blog:${SEARCH_MODES.summary}`,
    divClass: `item-${SEARCH_MODES.summary}`,
  },
};

export const OPERATIONS_OPTIONS = {
  popovers: {
    position: Position.BOTTOM_RIGHT,
    minimal: true,
    interactionKind: 'click',
    canEscapeKeyClose: true,
    hoverCloseDelay: 0,
  },
};

const FILTER_DEFAULT = {
  value: null,
  label: 'Cleared',
  icon: SEARCH_ICONS.filter,
};

const FILTER_OPTIONS = [
  {
    value: 'blog',
    label: 'Blog Only',
    icon: SEARCH_ICONS.blog,
  },
  {
    value: 'portfolio',
    label: 'Portfolio Only',
    icon: SEARCH_ICONS.portfolio,
  },
  {
    value: null,
    label: 'Clear Filter',
    icon: SEARCH_ICONS.clearFilter,
  },
];

const SORT_DEFAULT = {
  value: null,
  label: 'Cleared',
  icon: SEARCH_ICONS.sort,
};

const SORT_OPTIONS = [
  {
    value: 'asc',
    label: 'Ascending',
    icon: SEARCH_ICONS.ascending,
  },
  {
    value: 'desc',
    label: 'Descending',
    icon: SEARCH_ICONS.descending,
  },
  { value: 'newest', label: 'Newest', icon: SEARCH_ICONS.newest },
  { value: 'oldest', label: 'Oldest', icon: SEARCH_ICONS.oldest },
  { value: null, label: 'Clear Sort', icon: SEARCH_ICONS.clearSort },
];

const SEARCHBAR_RESETS = {
  open: false,
  isDialogOpen: false,
  selectedFilter: FILTER_DEFAULT,
  selectedSort: SORT_DEFAULT,
  isClearedFilter: true,
  isClearedSort: true,
  loading: false,
  item: '',
  items: [],
  tagQueries: [],
  isSpecSearch: false,
  searchMode: SEARCH_MODES.general,
  searchBarLeftIco: SEARCH_ICONS.generalSearch,
  specificQuery: '',
  searchPerformed: false,
  sort: null,
  type: null,
  page: 1,
  lastLoadedPage: 0,
  totalPages: null,
  limit: 20,
};

const KEYS = {
  show: (onKeyDownParam) => {
    return [
      {
        combo: 'mod + k', // '⌘ + k' for macOS, 'ctrl + k' for Windows and Linux
        global: true,
        label: 'Show Search Bar',
        onKeyDown: onKeyDownParam,
        preventDefault: true,
      },
    ];
  },
  submit: (event, { condition, actions }) =>
    keyDownAction(event, {
      key: 'Enter',
      condition: condition,
      actions: actions,
    }),
};

const INPUT_PROPS = {
  tagName: 'div',
  placeholder: 'Search...',
  type: 'text',
  className: 'search-input-box',
  onKeyDown: (event, { condition, actions }) =>
    KEYS.submit(event, { condition, actions }),
  rightElement: SearchBar.Omnibar.RightElements,
  leftElement: SearchBar.Omnibar.LeftElements,
};

export const SEARCHBAR_OPTIONS = {
  FILTER_DEFAULT,
  FILTER_OPTIONS,
  SORT_DEFAULT,
  SORT_OPTIONS,
  SEARCHBAR_RESETS,
  INPUT_PROPS,
  KEYS,
};

export const THROTTLE_TIME = 750;

export const SCROLL_THRESHOLD = 10;

const hdKbdBtnsClass = 'search-help-modal-kbd-btns';

const HD_TABLE = {
  1: {
    headers: ['Button', 'Hotkey/Event', 'Action'],
    rows: {
      1: [
        <Button
          className={hdKbdBtnsClass}
          icon={<Icon icon={SEARCH_ICONS.submitQuery} />}
          minimal={false}
        />, // Button
        <KeyComboTag combo='enter' />, // Hotkey/Event
        'search request submission', // Action
      ],
      2: [
        <Button
          className={hdKbdBtnsClass}
          icon={<Icon icon={SEARCH_ICONS.filter} />}
          minimal={false}
        />,
        <Icon icon={SEARCH_ICONS.toggleOpen} color='#5F6B7C' />,
        'select filter option',
      ],
      3: [
        <Button
          className={hdKbdBtnsClass}
          icon={<Icon icon={SEARCH_ICONS.sort} />}
          minimal={false}
        />,
        <Icon icon={SEARCH_ICONS.toggleOpen} color='#5F6B7C' />,
        'select sort option',
      ],
      4: [
        <Button
          className={hdKbdBtnsClass}
          icon={<Icon icon={SEARCH_ICONS.helpDialog} color='#CCCCCC' />}
          minimal={true}
        />,
        <Icon icon={SEARCH_ICONS.toggleOpen} color='#5F6B7C' />,
        'open search bar cheat sheet',
      ],
    },
  },
  2: {
    headers: ['Icon', 'Prefixes', 'Search Scope'],
    rows: {
      1: [
        <Icon icon={SEARCH_ICONS.generalSearch} />,
        '\u2205',
        'all fields below',
      ],
      2: [
        <Icon icon={SEARCH_ICONS.title} />, // Icon
        `'${SEARCH_PREFIXES.title[1]}' and '${SEARCH_PREFIXES.title[0]}'`, // Prefixes
        'titles', // Search Scope
      ],
      3: [
        <Icon icon={SEARCH_ICONS.tag} />,
        `'${SEARCH_PREFIXES.tag[0]}'`,
        'tags',
      ],
      4: [
        <Icon icon={SEARCH_ICONS.category} />,
        `'${SEARCH_PREFIXES.category[1]}' and '${SEARCH_PREFIXES.category[0]}'`,
        'categories',
      ],
      5: [
        <Icon icon={SEARCH_ICONS.description} />,
        `'${SEARCH_PREFIXES.description[1]}' and '${SEARCH_PREFIXES.description[0]}'`,
        'portfolio artifact descriptions',
      ],
      6: [
        <Icon icon={SEARCH_ICONS.summary} />,
        `'${SEARCH_PREFIXES.summary[1]}' and '${SEARCH_PREFIXES.summary[0]}'`,
        'blog article summaries',
      ],
    },
  },
};
export const HELP_DIALOG_TABLE = HD_TABLE;
