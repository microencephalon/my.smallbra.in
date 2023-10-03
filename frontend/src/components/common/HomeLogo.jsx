import { Text } from '@blueprintjs/core';

const HomeLogo = () => {
  return (
    <div id='home-logo'>
      {/* eslint-disable jsx-a11y/aria-role */}
      <img
        id='home-logo-img'
        src='http://192.168.1.66:8081/storage/images/icons/smbrIcon-black.svg'
        alt='smallbra.in logo'
        role='logo'
      />
      <Text tagName='h1' id='home-logo-text'>
        my.smallbra.in
      </Text>
    </div>
  );
};

export default HomeLogo;
