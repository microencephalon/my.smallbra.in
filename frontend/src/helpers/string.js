// frontend/src/assets/js/string.js

// Helper function to check if string contains substring
export function stringContains(str, substr) {
  str.toLowerCase().includes(substr.toLowerCase());
}

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
const WORDS_BEFORE_HIGHLIGHT = 5;
const WORDS_AFTER_HIGHLIGHT = 5;
function cropText(textParts) {
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
function getHighlightedAndCroppedText(value, item, highlightClass) {
  if (typeof value !== 'string') value = '';

  if (stringContains(value, item)) {
    let highlightedText = highlightText(value, item);
    let croppedText = cropText(highlightedText);

    return croppedText.map((part, i) =>
      part.highlight ? (
        <mark key={i} className={highlightClass}>
          {part.text}
        </mark>
      ) : (
        part.text
      )
    );
  }

  return null;
}

// Function to highlight query
export function highlightQuery({
  searchMode,
  searchModeStr,
  specQ,
  val,
  item,
  highlightClass = 'mysb-omnibar-hl-yield',
}) {
  return searchMode === searchModeStr
    ? getHighlightedAndCroppedText(val, specQ, highlightClass)
    : getHighlightedAndCroppedText(val, item, highlightClass);
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
