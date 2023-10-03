// frontend/src/store/hotkeys/omnibarKeys.js
export const omniShowHotkey = (onKeyDownParam) => {
  return [
    {
      combo: 'mod + k', // '⌘ + k' for macOS, 'ctrl + k' for Windows and Linux
      global: true,
      label: 'Show Omnibar',
      onKeyDown: onKeyDownParam,
      preventDefault: true,
    },
  ];
};
