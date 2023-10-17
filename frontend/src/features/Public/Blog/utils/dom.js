export const styleAnchors = (document) => {
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    if (link.querySelector('sup')) {
      link.style.setProperty('text-decoration-line', 'none', 'important');
    }
  });
};

export const fixCheckboxAlignment = (document) => {
  const checkboxes = document.querySelectorAll("li > input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    const listItem = checkbox.closest('li');
    if (listItem) {
      listItem.style.display = 'flex';
      listItem.style.alignItems = 'center';
      listItem.style.paddingLeft = '0rem';
      listItem.style.marginLeft = '-1.30rem';
    }
  });
};

export const fixPreElements = (document) => {
  const preElements = document.querySelectorAll('pre');
  preElements.forEach((preElement) => {
    if (preElement.querySelector('code.language-code-string')) {
      preElement.style.all = 'unset';
      preElement.style.setProperty('all', 'unset', '!important');
    }
  });
};

export const firefoxFixes = () => {
  return { styleAnchors, fixCheckboxAlignment, fixPreElements };
};
