import Hotkeys from './Hotkeys';
import { SearchBarHelpDialog } from './HelpDialog';
import LeftElements from './LeftElements';
import RightElements from './RightElements';

const Omnibar = {
  LeftElements,
  RightElements,
  Hotkeys,
  HelpDialog: SearchBarHelpDialog,
};

export default Omnibar;
