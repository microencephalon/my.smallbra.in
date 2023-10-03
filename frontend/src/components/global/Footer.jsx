// frontend/src/components/Nav.jsx
import { useNavigate } from 'react-router-dom';
import { Text, AnchorButton, ButtonGroup } from '@blueprintjs/core';
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

const Footer = () => {
  const navigate = useNavigate();

  const handleInternalClick = (endpoint) => {
    navigate(endpoint); // navigate to endpoint
    window.scrollTo(0, 0); // scroll to the top
  };

  const getLink = (url, handle) => {
    if (url.includes('mailto:')) {
      return url + handle;
    } else {
      return url + '/' + handle;
    }
  };

  const stripScheme = (url) => {
    switch (true) {
      case url.includes('https://www.'):
        return url.replace('https://www.', '');
      case url.includes('http://www.'):
        return url.replace('http://www.', '');
      case url.includes('https://'):
        return url.replace('https://', '');
      case url.includes('http://'):
        return url.replace('http://', '');
      case url.includes('mailto:'):
        return url.replace('mailto:', '');
      default:
        return url;
    }
  };

  const footerLinks = {
    email: getLink('mailto:', 'danatolman@icloud.com'),
    github: getLink('https://www.github.com', 'dctii'),
    x: getLink('https://www.x.com', 'danatolman'),
    instagram: getLink('https://www.instagram.com', 'danatolman'),
    facebook: getLink('https://www.facebook.com', 'danactolman'),
    nodejs: 'https://nodejs.org',
    blueprintjs: 'https://blueprintjs.com',
    react: 'https://react.dev',
    express: 'https://expressjs.com',
    mongodb: 'https://mongodb.com',
  };

  const FooterButton = ({ id, title, link }) => {
    let icon = null;
    switch (true) {
      case link.includes('mailto:'):
        icon = <FaEnvelope />;
        break;
      case link.includes('github.com'):
        icon = <FaGithub />;
        break;
      case link.includes('x.com'):
        icon = <FaXTwitter />;
        break;
      case link.includes('facebook.com'):
        icon = <FaFacebook />;
        break;
      case link.includes('instagram.com'):
        icon = <FaInstagram />;
        break;
      case link.includes('nodejs.org'):
        icon = <SiNodedotjs />;
        break;
      case link.includes('blueprintjs.com'):
        icon = <SiBlueprint />;
        break;
      case link.includes('react.dev'):
        icon = <SiReact />;
        break;
      case link.includes('expressjs.com'):
        icon = <SiExpress />;
        break;
      case link.includes('mongodb.com'):
        icon = <SiMongodb />;
        break;
      default:
        break;
    }
    return (
      <AnchorButton
        id={id}
        title={title}
        minimal={true}
        large={true}
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        icon={icon}
      />
    );
  };

  const SocialButtons = () => {
    return (
      <div id='footer-social-items'>
        <ButtonGroup>
          <FooterButton
            id='footer-item-email'
            title={stripScheme(footerLinks.email)}
            link={footerLinks.email}
          />
          <FooterButton
            id='footer-item-github'
            title={stripScheme(footerLinks.github)}
            link={footerLinks.github}
          />
          <FooterButton
            id='footer-item-x'
            title={stripScheme(footerLinks.x)}
            link={footerLinks.x}
          />
          <FooterButton
            id='footer-item-instagram'
            title={stripScheme(footerLinks.instagram)}
            link={footerLinks.instagram}
          />
          <FooterButton
            id='footer-item-facebook'
            title={stripScheme(footerLinks.facebook)}
            link={footerLinks.facebook}
          />
        </ButtonGroup>
      </div>
    );
  };

  const HomeButton = () => {
    return (
      <div id='footer-home-logo' onClick={() => handleInternalClick('/')}>
        <AnchorButton
          id='footer-item-home-button'
          minimal={true}
          large={true}
          href='/'
          target='_parent'
          onClick={(e) => e.preventDefault()}
          icon={
            <>
              <img
                id='footer-home-img'
                src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
                alt='smallbra.in logo'
              />
              <Text tagName='span' id='footer-home-text'>
                MY.SMALLBRA.IN (2023)
              </Text>
            </>
          }
        />
      </div>
    );
  };

  const BuiltWithButtons = () => {
    return (
      <div id='footer-built-with-items'>
        <ButtonGroup>
          <FooterButton id='footer-item-nodejs' link={footerLinks.nodejs} />
          <FooterButton id='footer-item-express' link={footerLinks.express} />
          <FooterButton id='footer-item-mongodb' link={footerLinks.mongodb} />
          <FooterButton
            id='footer-item-blueprint'
            link={footerLinks.blueprintjs}
          />
          <FooterButton
            id='footer-item-react'
            title={stripScheme(footerLinks.react)}
            link={footerLinks.react}
          />
        </ButtonGroup>
      </div>
    );
  };

  return (
    <div id='footer'>
      <div id='footer-items'>
        <SocialButtons />
        <HomeButton />
        <BuiltWithButtons />
      </div>
    </div>
  );
};

export default Footer;
