import { useEffect } from 'react';

interface Params {
  targetEl: HTMLElement | null;
  hasMore: boolean;
  onIntersect: () => void;
}

const useInfinteScroll = ({ targetEl, hasMore, onIntersect }: Params) => {
  useEffect(() => {
    if (!hasMore || !targetEl) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });
    observer.observe(targetEl);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, onIntersect, targetEl]);
};

export default useInfinteScroll;
