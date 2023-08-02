// import prettier from 'prettier';
import { highlight as cliHighlight } from 'cli-highlight';

export function convertToObj(input) {
  switch (true) {
    case input instanceof Map:
      return Object.fromEntries(input);
    case Array.isArray(input):
      return Object.fromEntries(input.map((value, index) => [index, value]));
    case typeof input === 'string' && input.trim().startsWith('{'):
      try {
        return JSON.parse(input);
      } catch (error) {
        throw new Error('Invalid JSON input');
      }
    case input instanceof Set:
      return Object.fromEntries(
        [...input].map((value, index) => [index, value])
      );
    case typeof input === 'string':
      return { 0: input };
    case typeof input === 'object':
      return input;
    default:
      throw new Error('Unsupported input type');
  }
}

export function printJson(obj) {
  if (!(obj instanceof Object)) obj = convertToObj(obj);
  try {
    const jsonString = JSON.stringify(obj, null, 2);
    // const formattedJsonString = prettier.format(jsonString, { parser: 'json' });
    // const highlightedJson = cliHighlight(formattedJsonString, {
    //   language: 'json',
    // });
    const highlightedJson = cliHighlight(jsonString, {
      language: 'json',
    });
    console.log(highlightedJson);
  } catch (err) {
    console.error(err);
  }
}
