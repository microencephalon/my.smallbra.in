// frontend/src/components/SBOmnibarParts.jsx
import {
  Dialog,
  Classes,
  Button,
  Icon,
  HTMLTable,
  KeyComboTag,
  Text,
  Colors,
} from '@blueprintjs/core';
import React from 'react';

export const OmnibarHelpDialog = ({
  isDialogOpen,
  handleCloseDialog,
  isLiveSearch,
}) => (
  <Dialog
    className='mysb-omnibar-help'
    isOpen={isDialogOpen}
    onClose={handleCloseDialog}
    canOutsideClickClose={true}
    canEscapeKeyClose={true}
    lazy={true}
  >
    <div className={`${Classes.DIALOG_HEADER} mysb-omnibar-help-header`}>
      <span className='mysb-omnibar-help-header-text'>
        Search Bar Cheat Sheet
      </span>
      <Button
        icon={<Icon icon='cross' color='whitesmoke' />}
        minimal={true}
        onClick={handleCloseDialog}
      />
    </div>
    <div className={`${Classes.DIALOG_BODY} mysb-omnibar-help-body`}>
      <OmnibarHelpTable isLiveSearch={isLiveSearch} />
    </div>
  </Dialog>
);

const OmnibarHelpTable = (isLiveSearch) => (
  <>
    {isLiveSearch ? (
      <div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Button</th>
              <th>HotKey/Event</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Button
                  className='mysb-omnibar-help-kbd-btns'
                  icon={<Icon icon='key-enter' />}
                />
              </td>
              <td>
                <KeyComboTag combo='enter' />
              </td>
              <td>search request submission</td>
            </tr>
            <tr>
              <td>
                <Button
                  className='mysb-omnibar-help-kbd-btns'
                  icon={<Icon icon='filter' />}
                />
              </td>
              <td>
                <Icon icon='open-application' color='#5F6B7C' />
              </td>
              <td>select filter option</td>
            </tr>
            <tr>
              <td>
                <Button
                  className='mysb-omnibar-help-kbd-btns'
                  icon={<Icon icon='sort' />}
                />
              </td>
              <td>
                <Icon icon='open-application' color='#5F6B7C' />
              </td>
              <td>select sort option</td>
            </tr>
            <tr>
              <td>
                <Button
                  className='mysb-omnibar-help-kbd-btns'
                  icon={<Icon icon='help' color='#CCCCCC' />}
                  minimal={true}
                />
              </td>
              <td>
                <Icon icon='open-application' color='#5F6B7C' />
              </td>
              <td>open search bar cheat sheet</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Prefixes</th>
              <th>Search Scope</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Icon icon='search' />
              </td>
              <td>{'\u2205'}</td>
              <td>all fields below</td>
            </tr>
            <tr>
              <td>
                <Icon icon='header-one' />
              </td>
              <td>'t:' and 'title:'</td>
              <td>titles</td>
            </tr>
            <tr>
              <td>
                <Icon icon='tag' />
              </td>
              <td>'tag:'</td>
              <td>tags</td>
            </tr>
            <tr>
              <td>
                <Icon icon='intersection' />
              </td>
              <td>'cat:' and 'category:'</td>
              <td>categories</td>
            </tr>
            <tr>
              <td>
                <Icon icon='search-template' />
              </td>
              <td>'desc:' and 'description:'</td>
              <td>portfolio artifact descriptions</td>
            </tr>
            <tr>
              <td>
                <Icon icon='search-template' />
              </td>
              <td>'sum:' and 'summary:'</td>
              <td>blog article summaries</td>
            </tr>
          </tbody>
        </HTMLTable>
        <Text
          tagName='span'
          className='bp5-text-small'
          style={{ color: Colors.GRAY2 }}
        >
          * Only one prefix can be used at a time
        </Text>
      </div>
    ) : (
      <div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Prefixes</th>
              <th>Search Scope</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Icon icon='search' />
              </td>
              <td>{'\u2205'}</td>
              <td>all</td>
            </tr>
            <tr>
              <td>
                <Icon icon='header-one' />
              </td>
              <td>'t:' and 'title:'</td>
              <td>titles</td>
            </tr>
            <tr>
              <td>
                <Icon icon='tag' />
              </td>
              <td>'tag:'</td>
              <td>tags</td>
            </tr>
            <tr>
              <td>
                <Icon icon='intersection' />
              </td>
              <td>'cat:' and 'category:'</td>
              <td>categories</td>
            </tr>
            <tr>
              <td>
                <Icon icon='search-template' />
              </td>
              <td>'desc:' and 'description:'</td>
              <td>portfolio artifact descriptions</td>
            </tr>
            <tr>
              <td>
                <Icon icon='search-template' />
              </td>
              <td>'sum:' and 'summary:'</td>
              <td>blog article summaries</td>
            </tr>
          </tbody>
        </HTMLTable>
        <Text
          tagName='span'
          className='bp5-text-small'
          style={{ color: Colors.GRAY2 }}
        >
          * Only one prefix can be used at a time
        </Text>
      </div>
    )}
  </>
);
