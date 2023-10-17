// documentation/api/swaggerJS/disableTryitOut.js

// NOTE: Doesn't sustain
function disableElementByID(elementID) {
  let xpathExpression = `(//div[@id='${elementID}']//button[contains(@class, 'try-out__btn')])[1]`;
  let xpathResult = document.evaluate(
    xpathExpression,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  if (xpathResult) {
    // Disable the element
    xpathResult.disabled = true;
    // Optional: Add a tooltip or title to inform the user
    xpathResult.title = 'This endpoint is disabled in Swagger UI.';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('swagger-ui');

  // If the targetNode is not found, just return
  if (!targetNode) {
    console.error('Target node not found');
    return;
  }

  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if the element is added to the DOM
        const element = document.getElementById(
          'operations-blog-updatePostContent'
        );
        if (element) {
          // Disable the element
          disableElementByID('operations-blog-updatePostContent');
          // Once the element is found and disabled, you can disconnect the observer
          observer.disconnect();
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
});
