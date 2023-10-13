import SearchBar from '../../SearchBar';
import { ButtonGroup } from '@blueprintjs/core';

const RightElements = ({ context }) => {
  return (
    <ButtonGroup>
      <SearchBar.Buttons.HelpDialog context={context} />
      <SearchBar.Buttons.Select kind='sort' context={context}>
        <SearchBar.Buttons.Sort context={context} />
      </SearchBar.Buttons.Select>
      <SearchBar.Buttons.Select kind='filter' context={context}>
        <SearchBar.Buttons.Filter context={context} />
      </SearchBar.Buttons.Select>
      <SearchBar.Buttons.SubmitQuery context={context} />
    </ButtonGroup>
  );
};

export default RightElements;
