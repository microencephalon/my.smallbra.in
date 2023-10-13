import _ from 'lodash';
import { Button, Icon } from '@blueprintjs/core';

const LoadMoreButton = ({ visibleWhen, onClick, context }) => {
  const { loading } = context;
  if (_.every(visibleWhen, Boolean)) {
    return (
      <Button
        className='load-more-button'
        aria-label='Load more items'
        minimal={true}
        large={true}
        onClick={onClick}
        icon={<Icon icon='add' color='#141414' />}
        disabled={loading}
      />
    );
  }
};
export default LoadMoreButton;
