import {
  Button,
  KeyComboTag,
  Navbar,
  Alignment,
  Icon,
} from '@blueprintjs/core';
import { OmnibarContext } from '../../store/contexts/OmnibarContext';

const NavSearchButton = () => {
  const { handleOmnibar: handleOmnibarToggle } = useContext(OmnibarContext);
  return (
    <Navbar.Group id='navbar-group-right' align={Alignment.RIGHT}>
      <Button
        id='nav-search-btn'
        minimal={true}
        alignText={Alignment.LEFT}
        icon={
          <Icon
            id='nav-search-icon'
            icon='search'
            size={20}
            svgProps={{ fill: '#9D9C9C' }}
          />
        }
        onClick={handleOmnibarToggle}
      >
        <div className='nav-search-btn-items'>
          <span className='nav-search-btn-text'></span>
          <KeyComboTag className='nav-search-kbd' combo='⌘ + K' />
        </div>
      </Button>
    </Navbar.Group>
  );
};

export default NavSearchButton;

/*
CSS for component

#navbar-group-right > button {
  outline: none;
}

@keyframes colorfade{
  0%{background-color: transparent;}
  50%{background-color: #E2E7F2;}
  100%{background-color: rgba(245, 245, 245, 0.637);}
}

#nav-search-btn {
  box-shadow: none;
  border-radius: 3px;
  background-color: rgba(245, 245, 245, 0.637);
  outline: none;
  animation: colorfade 1.1s 1 ease-in-out;
  transition: background-color 0.3s ease-in-out;
  width: 300px;
  height:auto;
  margin-top: 26px;
}

#nav-search-btn:hover {
  background-color: #e5e9f2 !important;
  box-shadow: none;
  text-decoration: none;
}

.nav-search-btn-text {
  margin-top: -3px;
  padding-left: 5px !important;
  font-family: 'Oswald';
  color: #9D9C9C !important;
  font-size: 22px;
}

#nav-search-icon {
  margin-top: 2px;
  margin-left: 5px;
}

@keyframes swell{
  0%{transform: scale(1);}
  50%{transform: scale(1.5);}
  100%{transform: scale(1);}
}

.nav-search-kbd {
  animation: swell 1.1s 1 ease-in-out
}

.nav-search-kbd > kbd.bp5-key {
  height: 28px;
  width: 28px;
  min-width: 28px;
  color: #9D9C9C;
}



*/
