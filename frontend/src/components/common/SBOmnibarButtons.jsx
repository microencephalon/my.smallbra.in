// frontend/src/components/common/OmnibarButtons.jsx
import { Button, Icon, MenuItem, Position } from '@blueprintjs/core';
import { Select } from '@blueprintjs/icons';

export const FilterButton = ({
  OPTIONS,
  selected,
  setSelected,
  setChoice,
  isCleared,
  setIsCleared,
}) => {
  return (
    <Select
      items={OPTIONS}
      itemPredicate={(query, item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      }
      onItemSelect={(item) => {
        setSelected(item);
        setChoice(item.value);
        item.label === 'Clear Filter'
          ? setIsCleared(true)
          : setIsCleared(false);
      }}
      activeItem={selected}
      itemRenderer={(item, { handleClick, modifiers }) => {
        return (
          <MenuItem
            active={modifiers.active}
            icon={
              selected.value === item.value &&
              !selected.label.startsWith('Clear') ? (
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
              selected.value === item.value &&
              !selected.label.startsWith('Clear')
                ? 'mysb-omnibar-sort-active-item'
                : 'mysb-omnibar-sort-inactive-item'
            }
            key={item.value}
            onClick={handleClick}
            text={item.label}
            roleStructure='listoption'
            disabled={
              item.label.startsWith('Clear')
                ? isCleared === true
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
        interactionKind: 'hover',
        canEscapeKeyClose: true,
        hoverCloseDelay: 0,
      }}
    >
      <Button
        outlined={true}
        icon={
          selected && !selected.label.startsWith('Clear')
            ? selected.icon
            : 'filter'
        }
      />
    </Select>
  );
};

export const SortButton = ({
  OPTIONS,
  selected,
  setSelected,
  setChoice,
  isCleared,
  setIsCleared,
}) => {
  return (
    <Select
      items={OPTIONS}
      itemPredicate={(query, item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      }
      onItemSelect={(item) => {
        setSelected(item);
        setChoice(item.value);
        item.label === 'Clear Sorting'
          ? setIsCleared(true)
          : setIsCleared(false);
      }}
      activeItem={selected}
      itemRenderer={(item, { handleClick, modifiers }) => {
        return (
          <MenuItem
            active={modifiers.active}
            icon={
              selected.value === item.value &&
              !selected?.label.startsWith('Clear') ? (
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
              selected.value === item.value &&
              !selected?.label.startsWith('Clear')
                ? 'mysb-omnibar-sort-active-item'
                : 'mysb-omnibar-sort-inactive-item'
            }
            key={item.value}
            onClick={handleClick}
            text={item.label}
            roleStructure='listoption'
            disabled={
              item.label.startsWith('Clear')
                ? isCleared === true
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
        interactionKind: 'hover',
        canEscapeKeyClose: true,
        hoverCloseDelay: 0,
      }}
    >
      <Button
        outlined={true}
        icon={
          selected
            ? selected.label.startsWith('Clear')
              ? 'sort'
              : selected.icon
            : 'sort'
        }
      />
    </Select>
  );
};

export const SubmitQueryButton = ({
  handleSearchRequest: handleClick,
  searchPerformed: disabled,
}) => (
  <Button
    icon={<Icon icon='key-enter' />}
    onClick={handleClick}
    disabled={disabled ? true : false}
  />
);

export const HelpButton = ({ setDialogOpen: handleClick }) => (
  <Button
    icon={<Icon icon='help' color='#CCCCCC' />}
    minimal={true}
    onClick={() => handleClick(true)}
  />
);
