import { ReactDOM } from 'react';

function getLargestNumber(numbers) {
  let largestNumber = numbers[0];
  for (let number of numbers) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}

const numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6];
const largestNumber = getLargestNumber(numbers);
const element = <div>The largest number is {largestNumber}</div>;

createRoot(document.getElementById('root')).render(element);
