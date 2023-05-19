// Create a new meta tag element
const metaTag: HTMLMetaElement = document.createElement('meta');

// Set the attributes of the meta tag element
metaTag.setAttribute('http-equiv', 'Content-Type');
metaTag.setAttribute('content', 'text/typescript');

// Get a reference to the head element of the document
const head: HTMLHeadElement | null = document.querySelector('head');
if (!head) {
  throw new Error('Could not find the <head> element in the document');
}

// Add the meta tag element to the head element
head.appendChild(metaTag);


function getLargestNumber(numbers: number[]): number {
  let largestNumber: number = numbers[0];
  for (let number of numbers) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}

const numbers: number[] = [3, 7, 2, 1, 8, 4, 5, 9, 6];
const largestNumber: number = getLargestNumber(numbers);
console.log(`The largest number is ${largestNumber}`);
