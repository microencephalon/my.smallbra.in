const FILTER_DEFAULT = {
  value: null,
  label: 'Cleared',
  icon: 'filter',
};

const FILTER_OPTIONS = [
  {
    value: 'blog',
    label: 'Blog Only',
    icon: 'manually-entered-data',
  },
  {
    value: 'portfolio',
    label: 'Portfolio Only',
    icon: 'projects',
  },
  {
    value: null,
    label: 'Clear Filter',
    icon: 'filter-remove',
  },
];

const SORT_DEFAULT = {
  value: null,
  label: 'Cleared',
  icon: 'sort',
};

const SORT_OPTIONS = [
  {
    value: 'asc',
    label: 'Ascending',
    icon: 'sort-alphabetical',
  },
  {
    value: 'desc',
    label: 'Descending',
    icon: 'sort-alphabetical-desc',
  },
  { value: 'newest', label: 'Newest', icon: 'clean' },
  { value: 'oldest', label: 'Oldest', icon: 'history' },
  { value: null, label: 'Clear Sorting', icon: 'delete' },
];

const omnibarResets = {
  isDialogOpen: false,
  selectedFilter: FILTER_DEFAULT,
  selectedSort: SORT_DEFAULT,
  isClearedFilter: true,
  isClearedSort: true,
};

const OMNIBAR_OPTIONS = {
  FILTER_DEFAULT,
  FILTER_OPTIONS,
  SORT_DEFAULT,
  SORT_OPTIONS,
  omnibarResets,
};

export default OMNIBAR_OPTIONS;
