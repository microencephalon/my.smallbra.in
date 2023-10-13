// frontend/src/shared/components/global/SearchBar/Buttons/index.js
import { Icon, Button } from '@blueprintjs/core';
import { SEARCH_ICONS } from '../../../../../constants/searchBar';
import Select from './Select';

const SearchBarButton = ({
  type, // 'helpDialog' | 'filter' | 'sort' | 'submitQuery'
  id,
  ariaLabel,
  context,
}) => {
  const {
    selectedFilter,
    selectedSort,
    searchPerformed,
    setIsDialogOpen,
    handleSearchRequest,
  } = context;

  const isOperation = type === 'filter' || type === 'sort';
  const isHelpDialog = type === 'helpDialog';
  const isSubmitQuery = type === 'submitQuery';
  const getOutlined = () => (!isHelpDialog ? true : false);
  const getIcon = {
    icon: (t) => {
      if (isOperation) {
        const selectedOp = t === 'filter' ? selectedFilter : selectedSort;
        return selectedOp && !selectedOp.label.startsWith('Clear')
          ? selectedOp.icon
          : SEARCH_ICONS[t];
      } else return SEARCH_ICONS[t];
    },
    color: isHelpDialog ? '#CCCCCC' : undefined,
  };
  const getDisabled = () => {
    if (!isSubmitQuery) return false;
    else return searchPerformed ? true : false;
  };
  const getMinimal = () => (!isHelpDialog ? false : true);
  const getOnClick = () => {
    if (isHelpDialog) return () => setIsDialogOpen(true);
    else if (isSubmitQuery)
      return () => !searchPerformed && handleSearchRequest();
    return () => {};
  };

  return (
    <Button
      id={id}
      aria-label={ariaLabel}
      icon={<Icon icon={getIcon.icon(type)} color={getIcon.color} />}
      disabled={getDisabled()}
      minimal={getMinimal()}
      outlined={getOutlined()}
      onClick={getOnClick()}
    />
  );
};

const Filter = ({ context }) => {
  const { selectedFilter } = context;

  return (
    <SearchBarButton
      type='filter'
      id={`search-btn-filter${
        selectedFilter.value ? '-' + selectedFilter.value : ''
      }`}
      ariaLabel='Opens filtering options for search queries'
      context={context}
    />
  );
};

const Sort = ({ context }) => {
  const { selectedSort } = context;
  return (
    <SearchBarButton
      type='sort'
      id={`search-btn-sort${
        selectedSort.value ? '-' + selectedSort.value : ''
      }`}
      ariaLabel='Opens sorting options for search queries'
      context={context}
    />
  );
};

const HelpDialog = ({ context }) => (
  <SearchBarButton
    type='helpDialog'
    id='search-btn-help'
    ariaLabel='Open Search Bar cheat sheet popup'
    context={context}
  />
);

const SubmitQuery = ({ context }) => (
  <SearchBarButton
    type='submitQuery'
    id='search-btn-submit'
    ariaLabel='Submits search query'
    context={context}
  />
);

const Buttons = {
  Filter,
  Sort,
  HelpDialog,
  SubmitQuery,
  Select,
};

export default Buttons;
