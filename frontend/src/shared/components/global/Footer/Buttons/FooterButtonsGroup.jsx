import { ButtonGroup } from '@blueprintjs/core';
import FooterButton from './FooterButton';

const FooterButtonsGroup = ({ id, buttonData }) => {
  const renderButtons = (buttonArray) => (
    <ButtonGroup>
      {buttonArray.map((btn) => (
        <FooterButton
          key={btn.id}
          id={btn.id}
          title={btn.title}
          link={btn.link}
          ariaLabel={btn.ariaLabel}
          getIcon={btn.getIcon}
        />
      ))}
    </ButtonGroup>
  );
  return <div id={id}>{renderButtons(buttonData)}</div>;
};

export default FooterButtonsGroup;
