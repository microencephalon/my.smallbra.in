import { useEffect } from 'react';

const useScalingTopPadding = ({ action, context }) => {
  const setPadding = action;
  const { isPageNarrow } = context;
  useEffect(() => {
    setPadding(); // Initial setting

    // Update on window resize
    window.addEventListener('resize', setPadding);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setPadding);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageNarrow]);
};

export default useScalingTopPadding;
