import { Spinner, SpinnerSize } from '@blueprintjs/core';

const SpinnerTemplate = ({ id, className }) => {
  if (!className)
    return (
      <div>
        <Spinner id={id} size={SpinnerSize.LARGE} tagName='g' />
      </div>
    );
  return (
    <div className={className}>
      <Spinner size={SpinnerSize.LARGE} tagName='g' />
    </div>
  );
};

export const CenterSpinner = () => {
  return <SpinnerTemplate id='center-spinner' className='spinner-large' />;
};

export const ArtifactSpinner = () => {
  return <SpinnerTemplate id='artifact-spinner' />;
};

export const PostSpinner = () => {
  return <SpinnerTemplate id='post-spinner' />;
};

export const MenuSpinner = () => {
  return <SpinnerTemplate id='search-menu-spinner' />;
};
