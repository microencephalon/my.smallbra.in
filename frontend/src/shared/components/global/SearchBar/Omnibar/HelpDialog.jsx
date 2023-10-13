// frontend/src/shared/components/global/SearchBar/HelpDialog.jsx
import _ from 'lodash';
import {
  Dialog,
  Classes,
  Button,
  Icon,
  HTMLTable,
  Text,
  Colors,
} from '@blueprintjs/core';
import {
  SEARCHBAR_OPTIONS,
  SEARCH_ICONS,
  HELP_DIALOG_TABLE,
} from '../../../../../constants/searchBar';

export const SearchBarHelpDialog = ({ isLiveSearch, context }) => {
  const { isDialogOpen, setIsDialogOpen } = context;
  const { SEARCHBAR_RESETS } = SEARCHBAR_OPTIONS;

  const handleCloseDialog = () =>
    setIsDialogOpen(SEARCHBAR_RESETS.isDialogOpen);

  const CloseButton = ({ icon = 'cross', onClick }) => {
    return (
      <Button
        id='search-help-close-btn'
        icon={<Icon icon={icon} color='whitesmoke' />}
        minimal={true}
        onClick={onClick}
      />
    );
  };

  const Header = ({ children }) => {
    return (
      <div id='search-help-modal-header' className={Classes.DIALOG_HEADER}>
        <span id='search-help-header-text'>{children}</span>
        <CloseButton
          icon={SEARCH_ICONS.helpDialogClose}
          onClick={handleCloseDialog}
        />
      </div>
    );
  };

  const Body = ({ children }) => {
    return (
      <div id='search-help-modal-body' className={Classes.DIALOG_BODY}>
        {children}
      </div>
    );
  };

  return (
    <Dialog
      id='search-help-modal'
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
      lazy={true}
    >
      <Header>Search Bar Cheat Sheet</Header>
      <Body>
        <SearchBarHelpTable isLiveSearch={isLiveSearch} />
      </Body>
    </Dialog>
  );
};

// Create components for different parts of the table
const SearchBarHelpTable = (isLiveSearch) => {
  const TableCell = ({ content, key }) => {
    return <td key={key}>{content}</td>;
  };

  const TableHeader = ({ headers }) => (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const TableRow = ({ cells }) => (
    <tr>
      {cells.map((cell, index) => (
        <TableCell key={index} content={cell} />
      ))}
    </tr>
  );

  const TableBody = ({ children }) => {
    return <tbody>{children}</tbody>;
  };

  const TableFootnotes = ({ children }) => {
    return (
      <Text
        tagName='span'
        className='bp5-text-small'
        style={{ color: Colors.GRAY2 }}
      >
        {children}
      </Text>
    );
  };

  const TableRows = _.mapValues(HELP_DIALOG_TABLE, (tableData) => {
    return _.map(tableData.rows, (rowCells, index) => (
      <TableRow key={index} cells={rowCells} />
    ));
  });

  HELP_DIALOG_TABLE.allRows = TableRows;

  return (
    <div id='help-dialog-table'>
      <HTMLTable>
        <TableHeader headers={HELP_DIALOG_TABLE[1].headers} />
        <TableBody>{HELP_DIALOG_TABLE.allRows[1]}</TableBody>
        <TableHeader headers={HELP_DIALOG_TABLE[2].headers} />
        <TableBody>{HELP_DIALOG_TABLE.allRows[2]}</TableBody>
      </HTMLTable>
      <TableFootnotes>* Only one prefix can be used at a time</TableFootnotes>
    </div>
  );
};
