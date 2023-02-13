import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/smallbrain-logo3.svg';

function Home() {
  return (
    <>
      <div>
        <Link to=''>
          {/* eslint-disable jsx-a11y/aria-role */}
          <img
            src={logo}
            alt='smallbra.in logo'
            role='logo'
            className='centered'
            width={512}
            height={512}
          />
        </Link>
      </div>
    </>
  );
}

export default Home;
