import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/smallbrain-logo3.svg';
// import nav from '../assets/svg/navbar-smbrain.svg';
import { navItems } from '../assets/svg/navbarItems';
// import Spinner from '../components/Spinner';

function Home() {
  return (
    <>
      <div className='centered'>
        <Link to=''>
          {/* eslint-disable jsx-a11y/aria-role */}
          <img
            src={logo}
            alt='smallbra.in logo'
            role='logo'
            width={512}
            height={512}
          />
        </Link>
        <br />
        <nav>
          {/* <img
            src={nav}
            className='navlist'
            alt='blog'
            role='navbar'
            width={512}
            height={512}
          /> */}
          {/* TODO: Need to make it so when hovering over #navItem{}Backs will turn #navItem{name} green */}
          <svg
            className='navlist'
            width='100%'
            height='100%'
            viewBox='0 0 512 512'
            xmlns='http://www.w3.org/2000/svg'
          >
            {navItems().map((item) => item())}
          </svg>
        </nav>
      </div>
    </>
  );
}

export default Home;
