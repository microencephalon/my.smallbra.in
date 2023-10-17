// frontend/src/sjared/components/global/Footer.jsx
import { useNavigate } from 'react-router-dom';
import { footerButtons } from '../../../../constants/footer';

import Buttons from './Buttons';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div id='footer'>
        <div id='footer-items'>
          <Buttons.Group
            id='footer-social-items'
            buttonData={footerButtons.social}
          />
          <Buttons.Home
            id='footer-home-logo'
            buttonData={footerButtons.home}
            navigate={navigate}
          />
          <Buttons.Group
            id='footer-built-with-items'
            buttonData={footerButtons.builtWith}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
