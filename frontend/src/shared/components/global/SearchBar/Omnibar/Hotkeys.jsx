import { HotkeysTarget2 } from '@blueprintjs/core';
import { SEARCHBAR_OPTIONS } from '../../../../../constants/searchBar';

const Hotkeys = ({ children, context }) => {
  const { handleSearchBarToggle } = context;
  return (
    <HotkeysTarget2
      hotkeys={SEARCHBAR_OPTIONS.KEYS.show(handleSearchBarToggle)}
    >
      {children}
    </HotkeysTarget2>
  );
};

export default Hotkeys;
