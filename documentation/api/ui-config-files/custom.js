// documentation/api/swaggerJS/disableTryitOut.js

// NOTE: Doesn't sustain
function disableElementByID(elementID) {
  console.log('Function running');
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
  // Wait for Swagger UI to load
  setTimeout(function () {
    disableElementByID('operations-blog-updatePostContent');
  }, 1000); // Adjust the timeout as necessary
});
