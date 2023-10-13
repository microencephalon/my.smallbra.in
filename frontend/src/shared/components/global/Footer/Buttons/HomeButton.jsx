import { AnchorButton } from '@blueprintjs/core';
import { stripScheme } from '../../../../utils/string';
import { handleInternalClick } from '../../../../utils/network';

const HomeButton = ({ id, buttonData, navigate }) => {
  return (
    <div id={id} onClick={() => handleInternalClick(navigate, buttonData.link)}>
      <AnchorButton
        key={buttonData.id}
        id={buttonData.id}
        title={buttonData.title ? stripScheme(buttonData.title) : null}
        aria-label={buttonData.ariaLabel}
        minimal={true}
        large={true}
        href={buttonData.link}
        target='_parent'
        onClick={(e) => e.preventDefault()}
        icon={buttonData.getIcon ? buttonData.getIcon() : null}
      />
    </div>
  );
};

export default HomeButton;
