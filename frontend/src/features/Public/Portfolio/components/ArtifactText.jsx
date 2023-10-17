import { Text as BJText } from '@blueprintjs/core';

export const Title = ({ children }) => {
  return (
    <BJText tagName='h1' className='artifact-title'>
      {children}
    </BJText>
  );
};

export const Description = ({ children }) => {
  return (
    <>
      <BJText tagName='h2' className='artifact-h2'>
        Description
      </BJText>
      <BJText tagName='p' className='artifact-description'>
        {children}
      </BJText>
    </>
  );
};

export const Text = { Title, Description };
