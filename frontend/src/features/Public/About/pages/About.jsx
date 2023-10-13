// frontend/src/features/Public/About/pages/About.jsx
import { useState, useEffect } from 'react';
import { Card, Elevation, Text } from '@blueprintjs/core';
import Common from '../../../../shared/components/common';
import { bodyText } from '../../../../constants/about';

function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const Header = ({ children }) => {
    return (
      <Card className='about-card about-card-header' elevation={Elevation.ZERO}>
        <Text className='about-post-card-title'>{children}</Text>
      </Card>
    );
  };

  const Body = ({ children }) => {
    return (
      <div id='about-text-container'>
        <Text
          tagName='p'
          className={`about-text-content ${
            isLoaded ? 'fade-in' : 'bp5-skeleton'
          }`}
        >
          {children}
        </Text>
      </div>
    );
  };

  const About = { Header, Body };

  return (
    <>
      <div className='about-container'>
        <Common.HomeLogo />
        <About.Header>About</About.Header>
        <About.Body>{bodyText}</About.Body>
        <Common.CardFooterSpace />
      </div>
    </>
  );
}

export default About;
