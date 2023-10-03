export function navigationBar(name) {
  const elements = {
    navbar: '#navbar',
    navbarGroupLeft: '#navbar-group-left',
    navbarGroupRight: '#navbar-group-right',
    homeButton: '#nav-home-btn',
    blogButton: '#nav-blog-btn',
    portfolioButton: '#nav-portfolio-btn',
    resumeButton: '#nav-resume-btn',
    aboutButton: '#nav-about-btn',
    searchButton: '#nav-search-btn',
  };
  if (!name || name === '') {
    return '#navbar';
  } else {
    switch (name) {
      case 'navbar':
        return elements.navbar;
      case 'homeButton':
        return elements.homeButton;
      case 'blogButton':
        return elements.blogButton;
      case 'portfolioButton':
        return elements.portfolioButton;
      case 'resumeButton':
        return elements.resumeButton;
      case 'aboutButton':
        return elements.aboutButton;
      case 'searchButton':
        return elements.searchButton;
      default:
        console.error('No element found');
        throw new Error('Element not found');
    }
  }
}

export const omnibar = {
  inputField: 'div.search-input-box > input.bp5-input',
  searchModeIcons: {
    general: '#search-mode-icon-default',
    tag: 'button.search-mode-icon > span.bp5-icon > svg[data-icon="tag"]',
    category:
      'button.search-mode-icon > span.bp5-icon > svg[data-icon="intersection"]',
    summary:
      'button.search-mode-icon > span.bp5-icon > svg[data-icon="search-template"]',
    description:
      'button.search-mode-icon > span.bp5-icon > svg[data-icon="search-template"]',
    title:
      'button.search-mode-icon > span.bp5-icon > svg[data-icon="header-one"]',
  },
  options: {
    sort: {
      asc: '#search-sort-option-asc',
      desc: '#search-sort-option-desc',
      newest: '#search-sort-option-newest',
      oldest: '#search-sort-option-oldest',
      clear: '#search-sort-option-clear',
    },
    filter: {
      blog: '#search-filter-option-blog',
      portfolio: '#search-filter-option-portfolio',
      clear: '#search-filter-option-clear',
    },
  },
  buttons: {
    submitQuery: '#search-btn-submit',
    help: '#search-btn-help',
    sort: {
      default: '#search-btn-sort',
      asc: '#search-btn-sort-asc',
      desc: '#search-btn-sort-desc',
      oldest: '#search-btn-sort-oldest',
      newest: '#search-btn-sort-newest',
    },
    filter: {
      default: '#search-btn-filter',
      portfolio: '#search-btn-filter-portfolio',
      blog: '#search-btn-filter-blog',
    },
  },
  helpDialog: {
    container: '',
    headerText: '#search-help-header-text',
    closeButton: '#search-help-close-btn',
  },
  searchResults: {
    menu: '#search-results-menu',
    menuHeader: '#search-menu-header-text',
    menuHeaderDivider:
      '#search-results-menu > li[role="separator"]:nth-child(2)',
    getResult: function (n) {
      // First menu item is the header. The second menu item is the divider.
      const listPosition = n + 2;
      return `#search-results-menu > li[role="option"]:nth-child(${listPosition}) > a.search-menu-item`;
    },
    menuTerminalDivider: '#search-menu-terminal-divider > li[role="separator"]',
  },
};
