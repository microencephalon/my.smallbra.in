// frontend/src/features/Public/About/pages/About.jsx
import { Text } from '@blueprintjs/core';
import Common from '../../../../shared/components/common';
import { bodyText } from '../../../../constants/about';
import '../../../../store/css/about.css';

function About() {
  const Header = ({ children }) => {
    return (
      <div className='about-header'>
        <Text className='about-title'>{children}</Text>
      </div>
    );
  };

  const Body = ({ children }) => {
    return (
      <div id='about-text-container'>
        <Text tagName='p' id='about-text-content'>
          {children}
        </Text>
      </div>
    );
  };

  const About = { Header, Body };

  return (
    <>
      <div id='about-container'>
        <Common.HomeLogo />
        <About.Header>About</About.Header>
        <About.Body>{bodyText}</About.Body>
        <Common.Roll.FooterSpace />
      </div>
    </>
  );
}

export default About;
