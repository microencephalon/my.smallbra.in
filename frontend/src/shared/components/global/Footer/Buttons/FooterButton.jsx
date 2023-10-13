import { AnchorButton } from '@blueprintjs/core';
import { stripScheme } from '../../../../utils/string';

const FooterButton = ({ id, title, link, ariaLabel, getIcon }) => {
  return (
    <AnchorButton
      id={id}
      title={title ? stripScheme(title) : null}
      aria-label={ariaLabel}
      minimal={true}
      large={true}
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      icon={getIcon ? getIcon() : null}
    />
  );
};

export default FooterButton;
