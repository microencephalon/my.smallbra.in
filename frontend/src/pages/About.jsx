// frontend/src/pages/About.jsx

import { useState, useEffect } from 'react';
import { Card, Elevation, Text } from '@blueprintjs/core';
import HomeLogo from '../components/common/HomeLogo';

function About() {
  const aboutText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Proin sed libero enim sed faucibus turpis in. Diam quis enim lobortis scelerisque fermentum dui. Vel fringilla est ullamcorper 
  eget nulla facilisi etiam dignissim diam. Tortor posuere ac ut consequat semper viverra nam. Sed vulputate mi sit amet mauris commodo 
  quis imperdiet massa. Risus nec feugiat in fermentum. Ut ornare lectus sit amet est placerat in egestas.
  `;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='about-container'>
        <HomeLogo />
        <Card
          className='about-card about-card-header'
          elevation={Elevation.ZERO}
        >
          <Text className='about-post-card-title'>About</Text>
        </Card>
        <div id='about-text-container'>
          <Text
            tagName='p'
            className={`about-text-content ${
              isLoaded ? 'fade-in' : 'bp5-skeleton'
            }`}
          >
            {aboutText}
          </Text>
        </div>
        <div className='card-footer-bottom-space'>&nbsp;</div>
      </div>
    </>
  );
}

export default About;
