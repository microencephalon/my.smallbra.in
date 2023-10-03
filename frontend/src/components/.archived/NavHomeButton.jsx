import { Navbar } from '@blueprintjs/core';

const NavHomeButton = () => {
  return (
    <Navbar.Heading id='nav-heading'>
      <div id='nav-home-btn' onClick={() => handleNavClick('/')}>
        <img
          id='nav-home-btn-img'
          src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
          alt='Home'
        />
        <Text id='nav-home-btn-text' tagName='span'>
          home
        </Text>
      </div>
    </Navbar.Heading>
  );
};

export default NavHomeButton;

/*

CSS for this component

#nav-home-btn {
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nav-home-btn-text {
  color: #121418;
  font-family: 'Oswald';
  font-size: 20px;
}

#nav-home-btn-img {
  width: 32px;
  height: auto;
  transition: transform .3s;
}

#nav-home-btn-img:hover {
  transform: scale(1.3);
}
*/
