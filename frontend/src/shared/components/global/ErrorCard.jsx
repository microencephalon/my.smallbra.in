import { useLocation } from 'react-router-dom';
import { Text, NonIdealState, NonIdealStateIconSize } from '@blueprintjs/core';
import { HTTP as HTTP_STATUS_CODES } from '../../../constants/statusCodes';

const ErrorCard = ({ responseCode }) => {
  let location = useLocation();

  // Look up the issue and description from the constants file
  const message = HTTP_STATUS_CODES[responseCode] || HTTP_STATUS_CODES.default;

  if (responseCode === '404') {
    message.desc = `The requested path '${location.pathname}' wasn't found.`;
  }

  const getErrorIcon = (status) => {
    const rc = parseInt(status, 10);
    switch (true) {
      case rc < 500 && rc > 399:
        return 'issue';
      case rc === 503:
        return 'wrench';
      default:
        return 'error';
    }
  };

  const Title = ({ text }) => {
    <Text className='error-card-title' tagName='span'>
      {text}
    </Text>;
  };

  const Description = ({ description: text }) => {
    <Text className='error-card-description' tagName='span'>
      {text}
    </Text>;
  };

  return (
    <>
      <NonIdealState
        className='error-card'
        layout='vertical'
        icon={getErrorIcon(responseCode)}
        iconSize={NonIdealStateIconSize.STANDARD}
        title={<Title responseCode={responseCode} />}
        description={<Description text={message.desc} />}
      />
    </>
  );
};

export default ErrorCard;
