// frontend/src/shared/utils/string.js

// Function to highlight the matching part in a string
function highlightText(text, highlight) {
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());

  if (index !== -1) {
    return [
      text.slice(0, index),
      text.slice(index, index + highlight.length),
      text.slice(index + highlight.length),
    ].map((part, i) => ({
      text: part,
      highlight: i === 1,
    }));
  }

  return [{ text }];
}

// Function to crop the text around the highlighted portion
function cropText(textParts) {
  const WORDS_BEFORE_HIGHLIGHT = 5;
  const WORDS_AFTER_HIGHLIGHT = 5;
  const HORIZONTAL_ELLIPSIS = '\u2026';
  return textParts.map((part, i) => {
    const words = part.text.split(' ');

    if (i === 0 && words.length > WORDS_BEFORE_HIGHLIGHT) {
      part.text =
        HORIZONTAL_ELLIPSIS +
        words.slice(words.length - WORDS_BEFORE_HIGHLIGHT).join(' ');
    } else if (i === 2 && words.length > WORDS_AFTER_HIGHLIGHT) {
      part.text =
        words.slice(0, WORDS_AFTER_HIGHLIGHT).join(' ') + HORIZONTAL_ELLIPSIS;
    }

    return part;
  });
}

// Function to get highlighted and cropped text
function getHighlightedText(value, item, highlightClass) {
  if (typeof value !== 'string') value = '';
  let processedResult;

  // Set string to
  console.debug({ value, item, highlightClass });
  const [str, substr] = [value.toLowerCase(), item.toLowerCase()];

  if (str.includes(substr)) {
    let highlightedText = highlightText(value, item);
    let croppedText = cropText(highlightedText);

    processedResult = croppedText.map((part, i) =>
      part.highlight ? (
        <mark key={i} className={highlightClass}>
          {part.text}
        </mark>
      ) : (
        part.text
      )
    );
  } else {
    processedResult = null;
  }

  return processedResult;
}

// Function to highlight query
export function highlightQuery({
  searchMode,
  searchModeStr,
  specificQuery,
  val,
  item,
  highlightClass = 'mysb-omnibar-hl-yield',
}) {
  console.debug({
    searchMode,
    searchModeStr,
    specificQuery,
    val,
    item,
    highlightClass,
  });
  const result =
    searchMode === searchModeStr
      ? getHighlightedText(val, specificQuery, highlightClass)
      : getHighlightedText(val, item, highlightClass);
  return result;
}

export function formatDate(dateString) {
  if (!dateString) {
    return 'YYYY/MM/DD';
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export const getCurrTimeString = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate;
};

export const stripScheme = (url) => {
  switch (true) {
    case url.includes('https://www.'):
      return url.replace('https://www.', '');
    case url.includes('http://www.'):
      return url.replace('http://www.', '');
    case url.includes('https://'):
      return url.replace('https://', '');
    case url.includes('http://'):
      return url.replace('http://', '');
    case url.includes('mailto:'):
      return url.replace('mailto:', '');
    default:
      return url;
  }
};
