// frontend/src/utils/dom.js
export function waitForElement(selector, timeout = 5000, interval = 100) {
  return new Promise((resolve, reject) => {
    let timeElapsed = 0;
    const checkForElement = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkForElement);
        resolve(element);
      }
      timeElapsed += interval;
      if (timeElapsed >= timeout) {
        clearInterval(checkForElement);
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }
    }, interval);
  });
}

export function observeForElement(selector, callback) {
  const targetNode = document.body; // or a more specific parent node of your elements
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      observer.disconnect(); // Disconnect observer after element is found and handled
    }
  });
  observer.observe(targetNode, config);
}
