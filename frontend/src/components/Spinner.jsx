import React from 'react';
import { gsap } from 'gsap';

// TODO: Need to test this out to see if it works. May not have functionality with GSAP. Should look like this:
// https://codepen.io/dctii/pen/MWqKOPB `Loader` by dctol
function Spinner() {
  const svg = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        width='200'
        height='200'
      >
        <circle
          cx='50'
          cy='50'
          r='40'
          stroke='#ccc'
          strokeWidth='8'
          fill='none'
        />
        <circle
          id='loader'
          cx='50'
          cy='50'
          r='40'
          stroke='#1abc9c'
          strokeWidth='8'
          fill='none'
          strokeDasharray='0 251.2'
        />
      </svg>
    );
  };

  const loader = () => {
    const loader = document.querySelector('#loader');
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(loader, {
      strokeDasharray: '251.2 0',
      duration: 1,
      ease: 'power1.inOut',
    }).to(loader, {
      strokeDasharray: '0 251.2',
      duration: 1,
      ease: 'power1.inOut',
    });
  };
  loader();

  return (
    <>
      <div>{svg}</div>
    </>
  );
}

export default Spinner;
