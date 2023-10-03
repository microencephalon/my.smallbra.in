// frontend/src/helpers/cli.js
// import prettier from 'prettier';
import { highlight as cliHighlight } from 'cli-highlight';
import { convertToObj } from './data';

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
