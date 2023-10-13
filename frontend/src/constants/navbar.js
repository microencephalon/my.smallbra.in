// frontend/src/constants/navbar.js
import { Position } from '@blueprintjs/core';

export const MENU_OPTIONS = [
  {
    value: 'home',
    label: 'home',
    href: '/',
  },
  {
    value: 'blog',
    label: 'blog',
    href: '/blog',
  },
  {
    value: 'portfolio',
    label: 'portfolio',
    href: '/portfolio',
  },
  {
    value: 'about',
    label: 'about',
    href: '/about',
  },
  // {
  //   value: 'resume',
  //   label: 'résumé',
  //   href: '/resume',
  // },
];

export const getNarrowMenuOptions = (context) => {
  const { isNavMenuOpen, isOmnibarOpen, setBlur } = context;
  return {
    popover: {
      isOpen: isNavMenuOpen,
      position: Position.BOTTOM,
      minimal: true,
      interactionKind: 'click',
      canEscapeKeyClose: true,
      hoverCloseDelay: 0,
      matchTargetWidth: true,
      onOpening: () => setBlur(true),
      onClosing: () => {
        if (isOmnibarOpen === false) setBlur(false);
      },
    },
  };
};
