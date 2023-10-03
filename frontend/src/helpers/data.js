// frontend/src/helpers/data.js
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
