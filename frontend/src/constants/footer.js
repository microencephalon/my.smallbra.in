// frontend/src/constants/footer.js
import { Text } from '@blueprintjs/core';
import {
  FaEnvelope,
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa6';
import {
  SiBlueprint,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
} from 'react-icons/si';

const getLink = (url, handle) => {
  if (url.includes('mailto:')) {
    return url + handle;
  } else {
    return url + '/' + handle;
  }
};

const SmallBrainFooterLogo = ({ id, alt }) => {
  return (
    <>
      <img
        id={id}
        src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
        alt={alt}
      />
      <Text tagName='span' id='footer-home-text'>
        MY.SMALLBRA.IN (2023)
      </Text>
    </>
  );
};

export const footerButtons = {
  home: {
    id: 'footer-item-home-button',
    title: 'https://my.smallbra.in',
    link: '/',
    ariaLabel: 'Go to my.smallbra.in home',
    getIcon: () => (
      <SmallBrainFooterLogo id='footer-home-img' alt='smallbra.in logo' />
    ),
  },
  social: [
    {
      id: 'footer-item-email',
      title: getLink('mailto:', 'danatolman@icloud.com'),
      link: getLink('mailto:', 'danatolman@icloud.com'),
      ariaLabel: 'Send email',
      getIcon: () => <FaEnvelope />,
    },
    {
      id: 'footer-item-github',
      title: getLink('https://www.github.com', 'dctii'),
      link: getLink('https://www.github.com', 'dctii'),
      ariaLabel: 'Go to GitHub user repository',
      getIcon: () => <FaGithub />,
    },
    {
      id: 'footer-item-x',
      title: getLink('https://www.x.com', ''), // add user name as 2nd argument to add profile path
      link: getLink('https://www.x.com', ''),
      ariaLabel: 'Go to Twitter profile',
      getIcon: () => <FaXTwitter />,
    },
    {
      id: 'footer-item-instagram',
      title: getLink('https://www.instagram.com', ''),
      link: getLink('https://www.instagram.com', ''),
      ariaLabel: 'Go to Instagram profile',
      getIcon: () => <FaInstagram />,
    },
    {
      id: 'footer-item-facebook',
      title: getLink('https://www.facebook.com', ''),
      link: getLink('https://www.facebook.com', ''),
      ariaLabel: 'Go to Facebook profile',
      getIcon: () => <FaFacebook />,
    },
  ],
  builtWith: [
    {
      id: 'footer-item-nodejs',
      title: 'https://nodejs.org',
      link: 'https://nodejs.org',
      ariaLabel: 'Go to Node.js home page',
      getIcon: () => <SiNodedotjs />,
    },
    {
      id: 'footer-item-express',
      title: 'https://expressjs.com',
      link: 'https://expressjs.com',
      ariaLabel: 'Go to Express.js home page',
      getIcon: () => <SiExpress />,
    },
    {
      id: 'footer-item-mongodb',
      title: 'https://mongodb.com',
      link: 'https://mongodb.com',
      ariaLabel: 'Go to MongoDB home page',
      getIcon: () => <SiMongodb />,
    },
    {
      id: 'footer-item-blueprint',
      title: 'https://blueprintjs.com',
      link: 'https://blueprintjs.com',
      ariaLabel: 'Go to BlueprintJS home page',
      getIcon: () => <SiBlueprint />,
    },
    {
      id: 'footer-item-react',
      title: 'https://react.dev',
      link: 'https://react.dev',
      ariaLabel: 'Go to React home page',
      getIcon: () => <SiReact />,
    },
  ],
};
